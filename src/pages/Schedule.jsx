// Schedule.js

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import travelPlane from '../assets/data/Packages.json';

function Schedule() {
  const [schedule, setSchedule] = useState([]);

  // Use useLocation to get state passed from CreatePlan
  const location = useLocation();
  const { userChoices } = location.state || {};
  const { tripData, recommendations, accommodations } = userChoices || {};

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = travelPlane.packages;

        // Ensure we have preferences before filtering
        if (!tripData || !recommendations) {
          console.error('No trip data or recommendations provided');
          return;
        }

        // Example filter logic (can be customized as needed)
        const filteredPackages = data.filter(pkg => {
          // Match package attributes to user preferences
          const matchesBeach = tripData.activities.includes('beach') === pkg.likeBeach;
          const matchesSurfing = tripData.activities.includes('surfing') === pkg.likeSurfing;
          const matchesBath = tripData.activities.includes('bath') === pkg.wantBath;

          return matchesBeach && matchesSurfing && matchesBath;
        });

        // Select the first package as an example
        const selectedPackage = filteredPackages[0];

        // Prepare the schedule format
        const formattedSchedule = selectedPackage?.activities.map((activity, index) => ({
          day: activity.day || index + 1,
          activities: activity.activities || [
            {
              time: activity.time,
              activity: activity.activity,
              description: activity.description,
            },
          ],
        })) || [];

        setSchedule(formattedSchedule);
      } catch (error) {
        console.error('Failed to fetch schedule:', error);
      }
    };

    fetchSchedule();
  }, [tripData, recommendations]);

  return (
    <div>
      <h2>Your Schedule</h2>
      {schedule.length > 0 ? (
        schedule.map((day, index) => (
          <div key={index}>
            <h3>Day {day.day}</h3>
            {day.activities.map((activity, idx) => (
              <div key={idx}>
                <h4>{activity.activity}</h4>
                <p>Description: {activity.description}</p>
                <p>Time: {activity.time}</p>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>Loading schedule...</p>
      )}
    </div>
  );
}

export default Schedule;
