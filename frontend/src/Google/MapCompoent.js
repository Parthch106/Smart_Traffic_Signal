import React from 'react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

const MapComponent = () => {
  const libraries = ['places'];

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY} libraries={libraries}>
      <GoogleMap
        mapContainerStyle={{ height: "400px", width: "100%", borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }} // Adjusted styles for map container
        zoom={10}
        center={{ lat: 40.7128, lng: -74.0060 }}
      >
        <Autocomplete>
          <input
            type="text"
            placeholder="Search a location"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '10px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              fontFamily: 'Poppins, sans-serif', // Ensuring the font matches
            }}
          />
        </Autocomplete>
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
