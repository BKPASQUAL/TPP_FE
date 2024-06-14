import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import "../assets/css/Userreq.css";

const GOOGLE_MAPS_API_KEY = 'AIzaSyCjlPRHMD6ztQgpxb-WfIL8HS274DIxYCA';

const mapContainerStyle = {
  height: '400px',
  width: '100%'
};

const locations = {
  Galle: { lat: 6.0535, lng: 80.2203 },
  Hikkaduwa: { lat: 6.1406, lng: 80.1044 },
  Unawatuna: { lat: 6.0099, lng: 80.2490 }
};

function Userreq() {
  const [location, setLocation] = useState('Galle'); // Default location
  const [preferences, setPreferences] = useState('beach, surfing'); // Default preferences
  const [maxDistance, setMaxDistance] = useState('10'); // Default maximum distance in km
  const [recommendations, setRecommendations] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setPreferences(prev =>
      checked ? [...prev, value] : prev.filter(pref => pref !== value)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userLocation = locations[location];
      const response = await axios.post('http://127.0.0.1:5001/get_recommendations', {
        location: [userLocation.lat, userLocation.lng],
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
      <div className="form-container">
        <h1>Travel Recommendations</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Select your location:
            <select value={location} onChange={handleLocationChange} required>
              <option value="Galle">Galle</option>
              <option value="Hikkaduwa">Hikkaduwa</option>
              <option value="Unawatuna">Unawatuna</option>
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
              type="number"
              value={maxDistance}
              onChange={(e) => setMaxDistance(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Get Recommendations</button>
        </form>
        <div className="recommendations-container">
          <h2>Recommendations:</h2>
          <ul>
            {recommendations.map((place, index) => (
              <li
                key={index}
                className={`recommendation-item ${selectedPlace === place ? 'selected' : ''}`}
                onClick={() => setSelectedPlace(place)}
              >
                {place.name} - {place.distance.toFixed(2)} km away - Activities: {place.activities.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="map-container">
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={locations[location]}
            zoom={10}
          >
            {recommendations.map((place, index) => (
              <Marker
                key={index}
                position={{ lat: place.latitude, lng: place.longitude }}
                onClick={() => setSelectedPlace(place)}
              />
            ))}
            {selectedPlace && (
              <InfoWindow
                position={{ lat: selectedPlace.latitude, lng: selectedPlace.longitude }}
                onCloseClick={() => setSelectedPlace(null)}
              >
                <div>
                  <h2>{selectedPlace.name}</h2>
                  <p>Distance: {selectedPlace.distance.toFixed(2)} km</p>
                  <p>Activities: {selectedPlace.activities.join(', ')}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default Userreq;
