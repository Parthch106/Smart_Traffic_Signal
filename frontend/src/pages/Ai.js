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
  const [trafficData, setTrafficData] = useState([]);
  const [predictedSignal, setPredictedSignal] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetching traffic data from API
  useEffect(() => {
    async function fetchTrafficData() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/data'); 
        if (response.data) {
          setTrafficData(response.data);
          setLoading(false);
        }
      } catch (err) {
        setError('Error fetching traffic data');
        setLoading(false);
        console.error("Error fetching traffic data", err);
      }
    }
    fetchTrafficData();
  }, []);

  // Function to simulate AI prediction
  const runAIPrediction = () => {
    // Example prediction logic (randomized values for demonstration)
    const prediction = {
      signal1: Math.floor(Math.random() * 60 + 20),
      signal2: Math.floor(Math.random() * 60 + 20),
      signal3: Math.floor(Math.random() * 60 + 20),
      signal4: Math.floor(Math.random() * 60 + 20),
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
        <p>Our AI system uses traffic data to dynamically adjust signal timings, improving traffic flow and reducing congestion.</p>

        {/* Real-time Traffic Data Section */}
        <section className="traffic-status">
          <h3><FaTrafficLight /> Smart Traffic Management System – Video Overview</h3>
          {/* {loading ? (
            <p>Loading real-time traffic data...</p>
          ) : error ? (
            <p>{error}</p>
          ) : trafficData.length > 0 ? (
            <ul>
              {trafficData.map((data, index) => (
                <li key={index}>Traffic at Signal {index + 1}: {data} vehicles</li>
              ))}
            </ul>
          ) : (
            <p>No traffic data available.</p>
          )} */}
          <div>
            <h3>Circles Locations and Signals</h3>
            {Object.keys(trafficData).length > 0 ? (
              <table className='t1-home' border ='2' cellPadding="10" style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
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
                      <td>{signals.signal1}</td>
                      <td>{signals.signal2}</td>
                      <td>{signals.signal3}</td>
                      <td>{signals.signal4}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No circles with signals available.</p>
            )}
            </div>

          {/* Adding Local Video */}
          <div className="video-container">
            <video width="100%" height="auto" controls>
              <source src="https://www.youtube.com/watch?v=VIa0dLHjPrI"  />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        {/* AI Prediction Section */}
        <section className="ai-prediction">
          <h3>AI Predicted Signal Timings</h3>
          {Object.keys(trafficData).length > 0 ? (
            <Line data={chartData} />
          ) : (
            <p>No AI prediction yet. Click the button below to run AI prediction.</p>
          )}
          <button onClick={runAIPrediction} className="run-ai-btn">
             'Run AI Prediction'
          </button>
        </section>
      </div>
    </div>
  );
}

export default Ai;
