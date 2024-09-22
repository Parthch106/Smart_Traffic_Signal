import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
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
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setLocation({ lat, lng });
        if (mapRef.current) {
          mapRef.current.panTo({ lat, lng });
        }
      } else {
        alert("Please select an option from the dropdown.");
      }
    }
  };

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  return (
    <LoadScript googleMapsApiKey='AIzaSyCJ7PEHPjd9V3AK1EehRDAUuA99y-74EG0' libraries={['places']}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={location}
          zoom={12}
          onLoad={onLoad}
        >
          <Marker position={location} />
        </GoogleMap>
      </div>
    </LoadScript>
  );
}

export default Googleapi;
