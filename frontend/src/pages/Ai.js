import React, { useEffect, useState } from 'react';
import NavBar from '../Navbar/NavBar';
import './ai.css';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { FaTrafficLight } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registering the required chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Ai() {
  const [trafficData, setTrafficData] = useState({});
  const [predictedSignal, setPredictedSignal] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [signals, setSignals] = useState({
    signal1: '',
    signal2: '',
    signal3: '',
    signal4: ''
  });

  // Fetching traffic data from API
  useEffect(() => {
    async function fetchTrafficData() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/data');
        if (response.data) {
          setTrafficData(response.data);
        }
      } catch (err) {
        setError('Error fetching traffic data');
        console.error('Error fetching traffic data', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrafficData();
  }, []);

  // Function to simulate AI prediction
  const runAIPrediction = () => {
    // Example prediction logic (randomized values for demonstration)
    const prediction = {
      signal1: parseInt(signals.signal1) || 33,
      signal2: parseInt(signals.signal2) || 60,
      signal3: parseInt(signals.signal3) || 120,
      signal4: parseInt(signals.signal4) || 170,
    };
    setPredictedSignal(prediction);
  };

  // Chart data for signal timings
  const chartData = {
    labels: ['Signal 1', 'Signal 2', 'Signal 3', 'Signal 4'],
    datasets: [
      {
        label: 'Predicted Signal Timings (seconds)',
        data: Object.values(predictedSignal).length > 0 ? Object.values(predictedSignal) : [0, 0, 0, 0],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <NavBar />
      <div className="ai-container">
        <h2>AI-Powered Traffic Signal Prediction</h2>
        <p>
          Our AI system uses traffic data to dynamically adjust signal timings, improving traffic flow and reducing congestion.
        </p>

        {/* Real-time Traffic Data Section */}
        <section className="traffic-status">
          <h3>
            <FaTrafficLight /> Smart Traffic Management System – Video Overview
          </h3>

          <div>
            <h3>Circles Locations and Signals</h3>
            {!loading && Object.keys(trafficData).length > 0 ? (
              <table className="t1-home" border="2" cellPadding="10" style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
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
                  {Object.entries(trafficData).map(([circleName, signals], index) => (
                    <tr key={index}>
                      <td>{circleName}</td>
                      <td>{signals.signal1 || 'N/A'}</td>
                      <td>{signals.signal2 || 'N/A'}</td>
                      <td>{signals.signal3 || 'N/A'}</td>
                      <td>{signals.signal4 || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : loading ? (
              <p>Loading real-time traffic data...</p>
            ) : (
              <p>No circles with signals available.</p>
            )}
          </div>

          {/* Adding Local Video */}
          {/* <div className="video-container">
            <video controls="true">
              <source src="https://www.youtube.com/watch?v=iJZcjZD0fw0" type="video/mp4"/>
              Your browser does not support the video tag.
            </video>
          </div> */}
          
          <iframe width="100%" height="500" src="https://www.youtube.com/embed/iJZcjZD0fw0?si=vUJl4vWS1XTKAVnh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </section>

        {/* AI Prediction Section */}
        <section className="ai-prediction">
          <h3>AI Predicted Signal Timings</h3>
          {Object.keys(predictedSignal).length > 0 ? (
            <Line data={chartData} />
          ) : (
            <p>No AI prediction yet. Click the button below to run AI prediction.</p>
          )}
          <button onClick={runAIPrediction} className="run-ai-btn">
            Run AI Prediction
          </button>
        </section>
      </div>
    </div>
  );
}

export default Ai;
