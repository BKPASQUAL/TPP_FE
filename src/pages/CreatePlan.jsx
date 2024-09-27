import React, { useState, useRef } from "react";
import { Divider } from "rsuite";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Navbar from "../components/common/Navbar";
import "../assets/css/CreatePlan.css";
import Button from "react-bootstrap/Button";

const GOOGLE_MAPS_API_KEY = "AIzaSyB7kbfj1W88pLMBACs5DKYel8396HJtXRE";

const mapContainerStyle = {
  height: "800px",
  width: "100%",
};

function CreatePlan() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tripData, recommendations, accommodations } = location.state || {};

  if (!tripData || !recommendations) {
    console.error("No trip data or recommendations available");
    return <div>Error: No data found</div>;
  }

  const [visibleContents, setVisibleContents] = useState(new Set());
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 6.0535,
    lng: 80.2203,
  });

  const hotelBoxRef = useRef(null);

  const scrollHotels = (direction) => {
    if (hotelBoxRef.current) {
      const scrollAmount = direction === "left" ? -250 : 250;
      hotelBoxRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const toggleContentVisibility = (dayIndex, index) => {
    const contentKey = `${dayIndex}-${index}`;
    setVisibleContents((prevState) => {
      const newVisibleContents = new Set(prevState);
      if (newVisibleContents.has(contentKey)) {
        newVisibleContents.delete(contentKey);
      } else {
        newVisibleContents.add(contentKey);
      }
      return newVisibleContents;
    });
  };

  const handleCreateSchedule = () => {
    const userChoices = {
      tripData,
      accommodations,
      recommendations,
    };

    navigate("/Schedule", { state: { userChoices } });
  };

  // Center the map on the selected activity when its name is clicked
  const handleActivityClick = (place) => {
    setSelectedPlace(place);
    setMapCenter({ lat: place.latitude, lng: place.longitude });
  };

  return (
    <>
      <Navbar />
      <div className="createPlan-main">
        <div className="createPlan-left">
          <div className="createPlan-left-top">
            <h1>Your trip to Galle for {tripData.numDays} days</h1>
            <p>
              Galle, a charming coastal town in Sri Lanka, offers a perfect
              blend of historical landmarks, hidden gems, and wellness
              activities. You can explore ancient fortifications, picturesque
              beaches, and unique boutiques while immersing yourself in the
              serene atmosphere. The warm weather in July provides an ideal
              setting for indulging in yoga and wellness retreats, allowing you
              to rejuvenate your mind and body. Whether you're discovering
              must-see attractions or seeking tranquility in secluded spots,
              Galle caters to your diverse interests as a solo traveler looking
              for an enriching experience.
            </p>
            <Divider />
          </div>
          <div className="createPlan-left-mid">
            <h1>Places to stay</h1>
            <div className="createPlan-hotel-box" ref={hotelBoxRef}>
              <div
                className="createPlan-arrow createPlan-arrow-left"
                onClick={() => scrollHotels("left")}
              ></div>
              {accommodations.map((acc, index) => (
                <div className="accommodation" key={index}>
                  <img
                    src={acc.picture_url}
                    alt={acc.name}
                    className="createPlan-hoteImg"
                  />
                  <h3>{acc.name}</h3>
                  <p>Type: {acc.type}</p>
                  {/* <p>Capacity: {acc.capacity} people</p> */}
                  <p>
                    Price: {acc.price_per_night} {acc.currency} per night
                  </p>
                  {acc.star_rating && <p>Star Rating: {acc.star_rating}</p>}
                </div>
              ))}
              <div
                className="createPlan-arrow createPlan-arrow-right"
                onClick={() => scrollHotels("right")}
              ></div>
            </div>
            <Divider />
          </div>
          {tripData.areas.map((area, dayIndex) => (
            <div className="createPlan-left-bottom" key={dayIndex}>
              <h1>
                Day {dayIndex + 1}: {area}
              </h1>
              <p className="createPlan-date-description">
                Experience the beauty and culture of {area} with a variety of
                activities tailored for you.
              </p>
              {recommendations[`day${dayIndex + 1}`]?.recommendations.map(
                (recommendation, index) => {
                  const contentKey = `${dayIndex}-${index}`;
                  return (
                    <div className="createPlan-date-details" key={index}>
                      <div className="createPlan-date-details-left">
                        <h1>{index + 1}</h1>
                        {index <
                          recommendations[`day${dayIndex + 1}`].recommendations
                            .length && <div className="createPlan-line"></div>}
                      </div>
                      <div className="createPlan-date-details-section">
                        <div
                          className="createPlan-date-details-header"
                          onClick={() => {
                            toggleContentVisibility(dayIndex, index);
                            handleActivityClick(recommendation);
                          }}
                        >
                          <div className="createPlan-activity">
                            {recommendation.name}
                          </div>
                          <div className="createPlan-toggle-icon">
                            <span className="material-symbols-outlined">
                              {visibleContents.has(contentKey)
                                ? "keyboard_arrow_up"
                                : "keyboard_arrow_down"}
                            </span>
                          </div>
                        </div>
                        {visibleContents.has(contentKey) && (
                          <div className="createPlan-content">
                            <img
                              src={recommendation.image_url}
                              alt={recommendation.name}
                              className="createPlan-activityImg"
                            />
                            <p>{recommendation.description}</p>
                            {/* <p>Distance: {recommendation.distance} km</p>
                            <p>Duration: {recommendation.duration} min</p> */}
                            <p>
                              Activities: {recommendation.activities.join(", ")}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
              <Divider />
            </div>
          ))}
          <div className="createPlan-btn">
            {/* <Button type="button" variant="dark" onClick={handleCreateSchedule}>
              Create Schedule
            </Button> */}
          </div>
        </div>
        <div className="createPlan-right">
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter} // Use state to center the map
              zoom={10}
            >
              {/* Render Markers for Recommendations (Activities) */}
              {Object.entries(recommendations).flatMap(
                ([day, { recommendations }]) =>
                  recommendations.map((place, index) => (
                    <Marker
                      key={`place-${day}-${index}`}
                      position={{
                        lat: place.latitude,
                        lng: place.longitude,
                      }}
                      onClick={() => setSelectedPlace(place)}
                      icon={{
                        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Blue marker for activity places
                      }}
                    />
                  ))
              )}

              {/* Render Markers for Accommodations (Hotels) */}
              {accommodations.map((acc, index) => (
                <Marker
                  key={`hotel-${index}`}
                  position={{
                    lat: acc.latitude,
                    lng: acc.longitude,
                  }}
                  onClick={() => setSelectedPlace(acc)}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Red marker for accommodations
                  }}
                />
              ))}

              {/* InfoWindow to display details of the selected place */}
              {selectedPlace && (
                <InfoWindow
                  position={{
                    lat: selectedPlace.latitude,
                    lng: selectedPlace.longitude,
                  }}
                  onCloseClick={() => setSelectedPlace(null)} // This allows users to close by clicking outside
                >
                  <div className="createPlan-infoWindow">
                    <h6>{selectedPlace.name}</h6>
                    {selectedPlace.distance && (
                      <p>Distance: {selectedPlace.distance.toFixed(2)} km</p>
                    )}
                    {selectedPlace.duration && (
                      <p>Travel Time: {selectedPlace.duration}</p>
                    )}
                    {selectedPlace.location && (
                      <p>
                        {/* Google Link:{" "} */}
                        <a
                          href={selectedPlace.location}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {selectedPlace.location}
                        </a>
                      </p>
                    )}
                    {selectedPlace.capacity && (
                      <p>Capacity: {selectedPlace.capacity} people</p>
                    )}
                    {selectedPlace.price_per_night && (
                      <p>
                        Price: {selectedPlace.price_per_night}{" "}
                        {selectedPlace.currency} per night
                      </p>
                    )}
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </>
  );
}

export default CreatePlan;
