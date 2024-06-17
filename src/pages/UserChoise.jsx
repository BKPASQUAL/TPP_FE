import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SelectPicker, TagPicker } from "rsuite";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import Navbar from "../components/common/Navbar";
import "../assets/css/UserChoice.css";
import "../assets/css/Userreq.css";
import { useGetRecommendationsMutation } from "../store/api/userChoiceApi";

const GOOGLE_MAPS_API_KEY = "AIzaSyCjlPRHMD6ztQgpxb-WfIL8HS274DIxYCA";

const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

const locations = {
  Galle: { lat: 6.0535, lng: 80.2203 },
  Hikkaduwa: { lat: 6.1406, lng: 80.1044 },
  Unawatuna: { lat: 6.0099, lng: 80.249 },
};

const activities = [
  "beach",
  "surfing",
  "sightseeing",
  "history",
  "photography",
  "shopping",
  "art museums",
  "nature",
  "hiking",
  "luxury shopping",
  "nightclubs",
  "futsal",
  "snorkeling",
  "diving",
  "boating",
  "bird watching",
  "education",
  "cultural",
  "meditation",
  "dining",
  "sports",
];

const areas = ["Galle", "Unawatuna", "Hikkaduwa"].map((item) => ({
  label: item,
  value: item,
}));

const vehicleOptions = [
  "Private Vehicle",
  "Bicycle",
  "public bus",
  "Train",
].map((item) => ({ label: item, value: item }));

const dayOptions = [
  { label: "One Day Trip", value: 1 },
  { label: "Two Day Trip", value: 2 },
  { label: "Three Day Trip", value: 3 },
];

function UserChoice() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [day1Recommendations, setDay1Recommendations] = useState([]);
  const [day2Recommendations, setDay2Recommendations] = useState([]);
  const [day3Recommendations, setDay3Recommendations] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [getRecommendations ] = useGetRecommendationsMutation();

  const handleActivityClick = (activity) => {
    setSelectedActivities((prev) =>
      prev.includes(activity) ? prev.filter((item) => item !== activity) : [...prev, activity]
    );
  };

  const onSubmit = async (data) => {
    data.activities = selectedActivities;
    data.maxDistance = 15;  // Set max distance to 15 km

    const numDays = data.numDays;
    const selectedAreas = data.areas || [];

    if (selectedAreas.length === 0 || selectedAreas.length < numDays) {
      console.error("Insufficient areas selected for the number of days");
      return;
    }

    try {
      for (let i = 0; i < numDays; i++) {
        const area = selectedAreas[i];
        const location = locations[area];
        const response = await getRecommendations({
          location: [location.lat, location.lng],
          preferences: data.activities,
          max_distance: data.maxDistance,
        }).unwrap();

        if (i === 0) {
          setDay1Recommendations(response);
        } else if (i === 1) {
          setDay2Recommendations(response);
        } else if (i === 2) {
          setDay3Recommendations(response);
        }
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="UserChoice-main">
        <div className="UserChoice-main-left">
          <div className="UserChoice-main-mid">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="UserChoice-field">
                <SelectPicker
                  data={dayOptions}
                  searchable={false}
                  style={{ width: 1000 }}
                  placeholder="How many days will you spend in the Galle area?"
                  {...register("numDays")}
                  onChange={(value) => setValue("numDays", value)}
                />
              </div>
              {Array.from({ length: watch("numDays") || 0 }, (_, index) => (
                <div className="UserChoice-field" key={index}>
                  <TagPicker
                    placeholder={`${index + 1} Day - Where to go?`}
                    data={areas}
                    style={{ width: 1000 }}
                    {...register(`areas.${index}`)}
                    onChange={(value) => setValue(`areas.${index}`, value)}
                  />
                </div>
              ))}
              <div className="UserChoice-field">
                <SelectPicker
                  {...register("vehicle")}
                  data={vehicleOptions}
                  searchable={false}
                  style={{ width: 1000 }}
                  placeholder="Select mode of transportation"
                  onChange={(value) => setValue("vehicle", value)}
                />
              </div>
              <div className="UserChoice-field">
                <label>What are your interests?</label>
                <div className="activities-container">
                  {activities.map((activity) => (
                    <button
                      key={activity}
                      type="button"
                      className={`activity-button ${
                        selectedActivities.includes(activity) ? "selected" : ""
                      }`}
                      onClick={() => handleActivityClick(activity)}
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
        <div className="UserChoice-main-right">
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={locations[watch("areas") ? watch("areas")[0] : "Galle"]}
              zoom={10}
            >
              {day1Recommendations
                .concat(day2Recommendations, day3Recommendations)
                .map((place, index) => (
                  <Marker
                    key={index}
                    position={{ lat: place.latitude, lng: place.longitude }}
                    onClick={() => setSelectedPlace(place)}
                  />
                ))}
              {selectedPlace && (
                <InfoWindow
                  position={{
                    lat: selectedPlace.latitude,
                    lng: selectedPlace.longitude,
                  }}
                  onCloseClick={() => setSelectedPlace(null)}
                >
                  <div>
                    <h2>{selectedPlace.name}</h2>
                    <p>Distance: {selectedPlace.distance.toFixed(2)} km</p>
                    <p>Travel Time: {selectedPlace.duration}</p>
                    <p>Activities: {selectedPlace.activities.join(", ")}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
          <div className="recommendations-list">
            <h2>Day 1 Recommendations:</h2>
            {day1Recommendations.map((place, index) => (
              <div key={index} className="recommendation-item">
                <h3>{place.name}</h3>
                <p>Distance: {place.distance.toFixed(2)} km</p>
                <p>Travel Time: {place.duration}</p>
                <p>Activities: {place.activities.join(", ")}</p>
              </div>
            ))}
            {watch("numDays") > 1 && (
              <>
                <h2>Day 2 Recommendations:</h2>
                {day2Recommendations.map((place, index) => (
                  <div key={index} className="recommendation-item">
                    <h3>{place.name}</h3>
                    <p>Distance: {place.distance.toFixed(2)} km</p>
                    <p>Travel Time: {place.duration}</p>
                    <p>Activities: {place.activities.join(", ")}</p>
                  </div>
                ))}
              </>
            )}
            {watch("numDays") > 2 && (
              <>
                <h2>Day 3 Recommendations:</h2>
                {day3Recommendations.map((place, index) => (
                  <div key={index} className="recommendation-item">
                    <h3>{place.name}</h3>
                    <p>Distance: {place.distance.toFixed(2)} km</p>
                    <p>Travel Time: {place.duration}</p>
                    <p>Activities: {place.activities.join(", ")}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserChoice;