import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCjlPRHMD6ztQgpxb-WfIL8HS274DIxYCA';

const mapContainerStyle = {
  height: '400px',
  width: '100%'
};

const center = {
  lat: 6.0535,
  lng: 80.2203
};

function App() {
  const [location, setLocation] = useState('Galle'); // Default location
  const [preferences, setPreferences] = useState('beach, surfing'); // Default preferences
  const [maxDistance, setMaxDistance] = useState('10'); // Default maximum distance in km
  const [recommendations, setRecommendations] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [userLocation, setUserLocation] = useState(center);

  const autocompleteRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(document.getElementById('user-location'));
      autocompleteRef.current.setFields(['geometry']);
      autocompleteRef.current.addListener('place_changed', onPlaceChanged);
    };
    document.head.appendChild(script);
  }, []);

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      setUserLocation(place.geometry.location.toJSON());
    }
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
      const response = await axios.post('http://127.0.0.1:5000/get_recommendations', {
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
      <h1>Travel Recommendations</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your location:
          <input id="user-location" type="text" placeholder="Enter a location" required />
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
      <div>
        <h2>Recommendations:</h2>
        <ul>
          {recommendations.map((place, index) => (
            <li key={index} onClick={() => setSelectedPlace(place)}>
              {place.name} - {place.distance.toFixed(2)} km away - Activities: {place.activities.join(', ')}
            </li>
          ))}
        </ul>
      </div>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userLocation}
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
  );
}

export default App;
