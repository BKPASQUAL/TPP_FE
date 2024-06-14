import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function RecommendationMap({ recommendations, apiKey }) {
  const mapContainerStyle = {
    height: '400px',
    width: '100%'
  };

  const center = {
    lat: 6.0535,
    lng: 80.2203
  };

  return (
    <LoadScript apiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
      >
        {recommendations.map((place, index) => (
          <Marker
            key={index}
            position={{ lat: place.latitude, lng: place.longitude }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default RecommendationMap;
