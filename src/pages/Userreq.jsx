import React, { useState } from 'react';
import axios from 'axios';

function Userreq() {
  const [location, setLocation] = useState('Galle'); // Default location
  const [preferences, setPreferences] = useState('beach, surfing'); // Default preferences
  const [maxDistance, setMaxDistance] = useState('10'); // Default maximum distance
  const [recommendations, setRecommendations] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/get_recommendations', {
                location: location,
                preferences: preferences.split(',').map(pref => pref.trim()),
                max_distance: maxDistance ? parseFloat(maxDistance) : undefined
            });
            setRecommendations(response.data);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    return (
        <div className="App">
            <h1>Travel Recommendations</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Select Location:
                    <select value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option value="Galle">Galle</option>
                        <option value="Unawatuna">Unawatuna</option>
                        <option value="Hikkaduwa">Hikkaduwa</option>
                    </select>
                </label>
                <br />
                <label>
                    Preferences (comma separated):
                    <input
                        type="text"
                        value={preferences}
                        onChange={(e) => setPreferences(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Max Distance (km):
                    <input
                        type="text"
                        value={maxDistance}
                        onChange={(e) => setMaxDistance(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Get Recommendations</button>
            </form>
            <div>
                <h2>Recommendations:</h2>
                <ul>
                    {recommendations.map((place, index) => (
                        <li key={index}>
                            {place.name} - {place.distance.toFixed(2)} km away - Activities: {place.activities.join(', ')}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Userreq;
