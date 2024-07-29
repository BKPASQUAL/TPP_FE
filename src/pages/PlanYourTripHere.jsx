import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SelectPicker } from "rsuite";
import Navbar from "../components/common/Navbar";
import "../assets/css/UserChoice.css";
import "../assets/css/Userreq.css";
import "../assets/css/PlanYourTripHere.css";
import { useGetRecommendationsMutation, useGetAccommodationsMutation } from "../store/api/userChoiceApi";
import { useNavigate } from "react-router-dom";

const GOOGLE_MAPS_API_KEY = "AIzaSyCjlPRHMD6ztQgpxb-WfIL8HS274DIxYCA";

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

const accommodationTypes = [
  { label: "Hotel", value: "hotel" },
  { label: "Villa", value: "villa" },
];

const starRatings = [
  { label: "5 Star", value: 5 },
  { label: "4 Star", value: 4 },
  { label: "3 Star", value: 3 },
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
  const [accommodationType, setAccommodationType] = useState(null);
  const [starRating, setStarRating] = useState(null);
  const [numPeople, setNumPeople] = useState(0);
  const [getRecommendations] = useGetRecommendationsMutation();
  const [getAccommodations] = useGetAccommodationsMutation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleActivityClick = (activity) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((item) => item !== activity)
        : [...prev, activity]
    );
  };

  const onSubmit = async (data) => {
    data.activities = selectedActivities;
    data.maxDistance = 5; // Set max distance to 5 km

    const numDays = data.numDays;
    const selectedAreas = data.areas || [];

    if (selectedAreas.length === 0 || selectedAreas.length < numDays) {
      console.error("Insufficient areas selected for the number of days");
      return;
    }

    setIsLoading(true);

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

        // Filter the recommendations by distance
        const filteredRecommendations = response.filter(
          (rec) => rec.distance <= data.maxDistance
        );

        newRecommendations[`day${i + 1}`] = {
          area,
          recommendations: filteredRecommendations,
        };
      }

      // Fetch accommodation recommendations
      let accommodationRecommendations = [];
      if (accommodationType) {
        const accommodationResponse = await getAccommodations({
          type: accommodationType,
          star_rating: accommodationType === 'hotel' ? starRating : undefined,
          num_people: accommodationType === 'villa' ? numPeople : undefined,
        }).unwrap();

        accommodationRecommendations = accommodationResponse;
      }

      setRecommendations({
        ...newRecommendations,
        accommodations: accommodationRecommendations,
      });

      // Navigate to CreatePlan and pass the data
      navigate("/create-plan", {
        state: { tripData: data, recommendations: newRecommendations, accommodations: accommodationRecommendations },
      });
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
                style={{ width: 300 }}
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
                    style={{ width: 300 }}
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
                style={{ width: 300 }}
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
            <div className="UserChoice-field">
              <SelectPicker
                {...register("accommodationType")}
                data={accommodationTypes}
                searchable={false}
                style={{ width: 300 }}
                placeholder="Select accommodation type"
                onChange={(value) => setAccommodationType(value)}
              />
            </div>
            {accommodationType === 'hotel' && (
              <div className="UserChoice-field">
                <SelectPicker
                  {...register("starRating")}
                  data={starRatings}
                  searchable={false}
                  style={{ width: 300 }}
                  placeholder="Select star rating"
                  onChange={(value) => setStarRating(value)}
                />
              </div>
            )}
            {accommodationType === 'villa' && (
              <div className="UserChoice-field">
                <label>Number of People</label>
                <input
                  type="number"
                  {...register("numPeople")}
                  value={numPeople}
                  onChange={(e) => setNumPeople(Number(e.target.value))}
                  placeholder="Enter number of people"
                />
              </div>
            )}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      {isLoading && <div className="createPlan-loading">Loading...</div>}
    </div>
  );
}

export default PlanYourTripHere;
