import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import mock from "../../Data/Package.json";
import "../assets/css/CreatePackage.css";

function CreatePackage() {
  const location = useLocation();
  const { days, likeBeach, likeSurfing, wantBath } = location.state || {};

  // Filter packages based on selected criteria
  const selectedPackage = mock.packages.find(
    (pkg) =>
      pkg.Type === (days === "1" ? "oneday" : `${days}Day`) &&
      pkg.likeBeach === likeBeach &&
      pkg.likeSurfing === likeSurfing &&
      pkg.wantBath === wantBath
  );

  const [activitiesVisible, setActivitiesVisible] = useState(true);

  const toggleActivitiesVisibility = () => {
    setActivitiesVisible(!activitiesVisible);
  };

  if (!selectedPackage) {
    return <div>No package found for the selected criteria.</div>;
  }

  return (
    <div className="package-container">
      <div className="package-container-left">
        <div className="package-container-left-top">
          <h1>This is It: The Best Galle Package for You</h1>
          <p>
            Immerse yourself in the rich history, vibrant culture, and stunning
            coastal beauty of Galle, a UNESCO World Heritage site located in the
            southern part of Sri Lanka. Our exclusive travel package is
            meticulously designed to offer you an unforgettable journey through
            the heart of this charming city and its surroundings.
          </p>
        </div>
        <div className="package-container-left-botm">
          <div>
            <div className="package-name">{selectedPackage.name}</div>
            <div onClick={toggleActivitiesVisibility} style={{ cursor: 'pointer' }}>
              <span className="material-symbols-outlined">
                {activitiesVisible ? 'expand_less' : 'expand_more'}
              </span>
            </div>
          </div>
          {activitiesVisible && (
            <div className="activities">
              {Array.isArray(selectedPackage.activities) &&
                selectedPackage.activities.length > 0 &&
                selectedPackage.activities.map((activity, index) => {
                  if (activity.activities) {
                    // Handling multi-day packages
                    return (
                      <div key={`day-${index}`} className="day-activities">
                        <div className="day-label">Day {activity.day}</div>
                        {activity.activities.map((subActivity, subIndex) => (
                          <div
                            key={subActivity.time}
                            className={`activity ${subIndex % 2 === 0 ? "even" : "odd"}`}
                          >
                            <div className="activity-time">{subActivity.time}</div>
                            <div className="activity-name">{subActivity.activity}</div>
                            <div className="activity-description">{subActivity.description}</div>
                          </div>
                        ))}
                      </div>
                    );
                  } else {
                    // Handling single-day packages
                    return (
                      <div
                        key={activity.time}
                        className={`activity ${index % 2 === 0 ? "even" : "odd"}`}
                      >
                        <div className="activity-time">{activity.time}</div>
                        <div className="activity-name">{activity.activity}</div>
                        <div className="activity-description">{activity.description}</div>
                      </div>
                    );
                  }
                })}
            </div>
          )}
        </div>
      </div>
      <div className="package-container-right"></div>
    </div>
  );
}

export default CreatePackage;
