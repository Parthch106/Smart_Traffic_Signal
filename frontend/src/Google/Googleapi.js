import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import './gapi.css'
import axios from 'axios' 

const mapContainerStyle = {
  width: '55vw',
  height: '80vh',
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

  const [circle, setCircle] = useState('');
  const [signals, setSignals] = useState({
    signal1: '',
    signal2: '',
    signal3: '',
    signal4: ''
  });
  const [postMessage, setPostMessage] = useState('');
  const [editMode, setEditMode] = useState(false); 
  const [specificCircleData, setSpecificCircleData] = useState(null);

  // Handle input change for signal times
  const handleSignalChange = (e) => {
    const { name, value } = e.target;
    setSignals({
      ...signals,
      [name]: value
    });
  };

  // Handle POST request to save circle with manually entered signal times
  const handlePostRequest = async () => {
    if(!circle){
      setPostMessage('Please enter the circle name');
      return;
    }
    else if (!signals.signal1 || !signals.signal2 || !signals.signal3 || !signals.signal4) {
      setPostMessage('Please enter all signal times.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/data', {
        circle,
        signals: {
          signal1: parseInt(signals.signal1),
          signal2: parseInt(signals.signal2),
          signal3: parseInt(signals.signal3),
          signal4: parseInt(signals.signal4),
        }
      });
      setPostMessage(response.data.message);
      setEditMode(false); // Hide the inputs again after submitting
      fetchSpecificCircleData(circle);  // Fetch the data for the specific circle
    } catch (error) {
      console.error('Error with POST request:', error);
    }
  };

  // Handle GET request to fetch saved circle data
  const fetchSpecificCircleData = async (circleName) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/data/${circleName}`);
      setSpecificCircleData(response.data); // Store specific circle data
    } catch (error) {
      console.error('Error fetching specific circle data:', error);
    }
  };

  const handleEditMode = () => {
    setEditMode(true);  // Show the circle input field
    setCircle('');      // Reset the circle input field
    setSignals({
      signal1: '',
      signal2: '',
      signal3: '',
      signal4: ''
    }); // Reset the signal input fields
    setPostMessage('');  // Clear any previous message
  };

  // Fetch saved data when the component mounts
  useEffect(() => {
    fetchSpecificCircleData();
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} 
      libraries={['places']}>
      <div className='search-map'>
        <div className='search-data'>
          <div className='search'>
          <h1>Search Location</h1>
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={onPlaceChanged}>
            <input
              type="text"
              placeholder="Search a location"
              // value={circle}
              // onChange={(e) => setCircle(e.target.value)}
              style={{
                width: '300px',
                height: '40px',
                padding: '10px',
                marginBottom: '20px',
              }}
            />
          </Autocomplete>
          </div>
          <h1>Location Circle Signal Timing Data</h1>

          <h3>Get Specific Location Circle Data</h3>
      <input
        type="text"
        placeholder="Enter circle location name"
        value={circle}
        onChange={(e) => setCircle(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />
      <button className='fetch-cir' onClick={() => fetchSpecificCircleData(circle)}>Fetch Circle Data</button>

      <h3 className='h3-gapi'>Want to change circle signals time?</h3>
      {!editMode && (
        <button className='change-cir' onClick={handleEditMode} >
          Change Circle Data
        </button>
      )}

      {editMode && (
        <>
          <h3>Enter Circle Name</h3>
          <input className='cir'
            type="text"
            value={circle}
            onChange={(e) => setCircle(e.target.value)}
            placeholder="Enter circle name"
            style={{ display: 'block', marginBottom: '10px' }}
          />

          {circle && (
            <>
              <h3>Enter Signal Times</h3>
              <input className='signal'
                type="number"
                name="signal1"
                value={signals.signal1}
                onChange={handleSignalChange}
                placeholder="Enter time for Signal 1"
                style={{ display: 'block', marginBottom: '10px' }}
              />
              <input className='signal'
                type="number"
                name="signal2"
                value={signals.signal2}
                onChange={handleSignalChange}
                placeholder="Enter time for Signal 2"
                style={{ display: 'block', marginBottom: '10px' }}
              />
              <input className='signal'
                type="number"
                name="signal3"
                value={signals.signal3}
                onChange={handleSignalChange}
                placeholder="Enter time for Signal 3"
                style={{ display: 'block', marginBottom: '10px' }}
              />
              <input className='signal'
                type="number"
                name="signal4"
                value={signals.signal4}
                onChange={handleSignalChange}
                placeholder="Enter time for Signal 4"
                style={{ display: 'block', marginBottom: '10px' }}
              />

              <button className='fetch-cir' onClick={handlePostRequest}>Save Circle Data</button>
              <p>{postMessage}</p>
            </>
          )}
        </>
      )}
      <h3 className='h3-gapi'>Circle Signal Data Table</h3>
      {specificCircleData ? (
        <table className='t1'>
          <thead>
            <tr>
              <th>Circle Name</th>
              <th>Signal 1 (Seconds)</th>
              <th>Signal 2 (Seconds)</th>
              <th>Signal 3 (Seconds)</th>
              <th>Signal 4 (Seconds)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{circle}</td>
              <td>{specificCircleData.signal1}</td>
              <td>{specificCircleData.signal2}</td>
              <td>{specificCircleData.signal3}</td>
              <td>{specificCircleData.signal4}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Enter a circle name to fetch its data.</p>
      )}
        </div>
        <div className='map'>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={location}
            zoom={12}
            onLoad={onLoad}>
            <Marker position={location} />
          </GoogleMap>
        </div>
      </div>
    </LoadScript>
  );
}

export default Googleapi;
