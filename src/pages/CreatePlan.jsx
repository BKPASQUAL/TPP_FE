import React, { useState } from "react";
import { Divider } from "rsuite";
import { useLocation } from "react-router-dom";
import "../assets/css/CreatePlan.css";

function CreatePlan() {
  const location = useLocation();
  const { tripData, recommendations } = location.state || {};

  // Ensure tripData and recommendations are available before using them
  if (!tripData || !recommendations) {
    console.error("No trip data or recommendations available");
    return <div>Error: No data found</div>;
  }

  console.log("Received Trip Data:", tripData);
  console.log("Received Recommendations:", recommendations);

  // Store a set of visible content keys
  const [visibleContents, setVisibleContents] = useState(new Set());

  const toggleContentVisibility = (dayIndex, index) => {
    const contentKey = `${dayIndex}-${index}`;
    setVisibleContents((prevState) => {
      const newVisibleContents = new Set(prevState);
      if (newVisibleContents.has(contentKey)) {
        newVisibleContents.delete(contentKey); // Remove the key if it's already visible
      } else {
        newVisibleContents.add(contentKey); // Add the key if it's not visible
      }
      return newVisibleContents;
    });
  };

  return (
    <div className="createPlan-main">
      <div className="createPlan-left">
        <div className="createPlan-left-top">
          <h1>Your trip to Galle for {tripData.numDays} days</h1>
          <p>
            Galle, a charming coastal town in Sri Lanka, offers a perfect blend
            of historical landmarks, hidden gems, and wellness activities. You
            can explore ancient fortifications, picturesque beaches, and unique
            boutiques while immersing yourself in the serene atmosphere. The
            warm weather in July provides an ideal setting for indulging in yoga
            and wellness retreats, allowing you to rejuvenate your mind and
            body. Whether you're discovering must-see attractions or seeking
            tranquility in secluded spots, Galle caters to your diverse
            interests as a solo traveler looking for an enriching experience.
          </p>
          <Divider />
        </div>
        <div className="createPlan-left-mid">
          <h1>Places to stay</h1>
          <div className="createPlan-hotel-box"></div>
          <Divider />
        </div>
        {tripData.areas.map((area, dayIndex) => (
          <div className="createPlan-left-bottom" key={dayIndex}>
            <h1>Day {dayIndex + 1}: {area}</h1>
            <p className="createPlan-date-description">
              Experience the beauty and culture of {area} with a variety of activities tailored for you.
            </p>
            {recommendations[`day${dayIndex + 1}`]?.recommendations.map((recommendation, index) => {
              const contentKey = `${dayIndex}-${index}`;
              return (
                <div className="createPlan-date-details" key={index}>
                  <div className="createPlan-date-details-left">
                    <h1>{index + 1}</h1>
                    {index < recommendations[`day${dayIndex + 1}`].recommendations.length  && (
                      <div className="createPlan-line"></div>
                    )}
                  </div>
                  <div className="createPlan-date-details-section">
                    <div
                      className="createPlan-date-details-header"
                      onClick={() => toggleContentVisibility(dayIndex, index)}
                    >
                      <div className="createPlan-activity">{recommendation.name}</div>
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
                        <p>Distance: {recommendation.distance} km</p>
                        <p>Duration: {recommendation.duration}</p>
                        <p>Activities: {recommendation.activities.join(", ")}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <Divider />
          </div>
        ))}
      </div>
      <div className="createPlan-right">Right content</div>
    </div>
  );
}

export default CreatePlan;