import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SelectPicker, TagPicker } from "rsuite";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Navbar from "../components/common/Navbar";
import "../assets/css/UserChoice.css";
import "../assets/css/Userreq.css";
import "../assets/css/PlanYourTripHere.css";

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

function PlanYourTripHere() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [recommendations, setRecommendations] = useState({});
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [getRecommendations] = useGetRecommendationsMutation();

  const handleActivityClick = (activity) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((item) => item !== activity)
        : [...prev, activity]
    );
  };

  const onSubmit = async (data) => {
    data.activities = selectedActivities;
    data.maxDistance = 15; // Set max distance to 15 km

    const numDays = data.numDays;
    const selectedAreas = data.areas || [];

    if (selectedAreas.length === 0 || selectedAreas.length < numDays) {
      console.error("Insufficient areas selected for the number of days");
      return;
    }

    try {
      let newRecommendations = {};
      for (let i = 0; i < numDays; i++) {
        const area = selectedAreas[i];
        const location = locations[area];
        const response = await getRecommendations({
          location: [location.lat, location.lng],
          preferences: data.activities,
          max_distance: data.maxDistance,
        }).unwrap();

        newRecommendations[`day${i + 1}`] = { area, recommendations: response };
      }
      setRecommendations(newRecommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const defaultCenter = locations.Galle; // Default center

  return (
    <div className="planTrip-main">
      <Navbar />
      <div className="planTrip-top">Plan Your Trip Here</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="planTrip-main-mid">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="UserChoice-field">
              <SelectPicker
                data={dayOptions}
                searchable={false}
                style={{ width: 10000 }}
                placeholder="How many days will you spend in the Galle area?"
                {...register("numDays")}
                onChange={(value) => setValue("numDays", value)}
              />
            </div>
            {watch("numDays") &&
              Array.from({ length: watch("numDays") || 0 }, (_, index) => (
                <div className="UserChoice-field" key={index}>
                  <SelectPicker
                    placeholder={`${index + 1} Day - Where to go?`}
                    data={areas}
                    style={{ width: 10000 }}
                    searchable={false}
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
                style={{ width: 10000 }}
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

        <div className="planTrip-main-right">
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={
                locations[watch("areas") ? watch("areas")[0] : "Galle"] ||
                defaultCenter
              }
              zoom={10}
            >
              {Object.values(recommendations)
                .flatMap(({ recommendations }) => recommendations)
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
            {watch("numDays") &&
              Array.from({ length: watch("numDays") || 0 }, (_, index) => (
                <div key={index}>
                  <h2>{`Day ${index + 1} Recommendations: ${
                    recommendations[`day${index + 1}`]?.area || ""
                  }`}</h2>
                  {(
                    recommendations[`day${index + 1}`]?.recommendations || []
                  ).map((place, placeIndex) => (
                    <div key={placeIndex} className="recommendation-item">
                      <h3>{place.name}</h3>
                      <p>Distance: {place.distance.toFixed(2)} km</p>
                      <p>Travel Time: {place.duration}</p>
                      <p>Activities: {place.activities.join(", ")}</p>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanYourTripHere;
