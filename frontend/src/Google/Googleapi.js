import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 21.170240, // Example: Surat, India
  lng: 72.831062,
};

function Googleapi() {
  const [location, setLocation] = useState(center);
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setLocation({ lat, lng });
        if (mapRef.current) {
          mapRef.current.panTo({ lat, lng });
        }
      } else {
        alert("No valid place selected. Please choose a location from the suggestions.");
      }
    }
  };

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} 
      libraries={['places']}
    >
      <div style={{ display: 'flex', height: '90vh' ,boxSizing : 'border-box' , }}>
        {/* Left side content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <h1>Search Location</h1>
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              placeholder="Search a location"
              style={{
                width: '300px',
                height: '40px',
                padding: '10px',
                marginBottom: '20px',
              }}
            />
          </Autocomplete>
        </div>

        <div style={{ width: '50%', height: '90%', paddingTop: '100px' }}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={location}
            zoom={12}
            onLoad={onLoad}
          >
            <Marker position={location} />
          </GoogleMap>
        </div>
      </div>
    </LoadScript>
  );
}

export default Googleapi;
