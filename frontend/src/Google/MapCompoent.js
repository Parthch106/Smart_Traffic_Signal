import React from 'react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

const MapComponent = () => {
  const libraries = ['places'];

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY} libraries={libraries}>
      <GoogleMap mapContainerStyle={{ height: "400px", width: "100%" }} zoom={10} center={{ lat: 40.7128, lng: -74.0060 }}>
        <Autocomplete>
          <input type="text" placeholder="Search a location" />
        </Autocomplete>
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
