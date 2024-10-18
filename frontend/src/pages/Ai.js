import React, { useEffect, useState } from 'react';
import NavBar from '../Navbar/NavBar';
import './ai.css';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { FaTrafficLight } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registering the required chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Ai() {
  const [trafficData, setTrafficData] = useState({});
  const [modelData, setModelData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [chartData, setChartData] = useState(null);
  const [showChart, setShowChart] = useState(false);

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

    async function fetchModelData() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/model_data');
        if (response.data) {
          setModelData(response.data);
        }
      } catch (err) {
        setError('Error fetching model data');
        console.error('Error fetching model data', err);
      }
    }

    fetchTrafficData();
    fetchModelData();
  }, []);

  // Function to prepare chart data from fetched traffic and model data
  const prepareChartData = () => {
    const labels = Object.keys(trafficData); // Circle names
    const signal1Data = [];
    const signal2Data = [];
    const signal3Data = [];
    const signal4Data = [];
    
    const modelSignal1Data = [];
    const modelSignal2Data = [];
    const modelSignal3Data = [];
    const modelSignal4Data = [];

    // Loop through each circle and get signal timings from both trafficData and modelData
    Object.values(trafficData).forEach((signals) => {
      signal1Data.push(signals.signal1 || 0);
      signal2Data.push(signals.signal2 || 0);
      signal3Data.push(signals.signal3 || 0);
      signal4Data.push(signals.signal4 || 0);
    });

    Object.values(modelData).forEach((signals) => {
      modelSignal1Data.push(signals.signal1 || 0);
      modelSignal2Data.push(signals.signal2 || 0);
      modelSignal3Data.push(signals.signal3 || 0);
      modelSignal4Data.push(signals.signal4 || 0);
    });

    // Set up the chart data structure with both trafficData and modelData
    const newChartData = {
      labels: labels,
      datasets: [
        {
          label: 'Traffic Signal 1 (seconds)',
          data: signal1Data,
          backgroundColor: 'rgba(255, 0, 0, 0.6)',
        },
        {
          label: 'Model Signal 1 (seconds)',
          data: modelSignal1Data,
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
        },
        {
          label: 'Traffic Signal 2 (seconds)',
          data: signal2Data,
          backgroundColor: 'rgba(255, 0, 0, 0.6)',
        },
        {
          label: 'Model Signal 2 (seconds)',
          data: modelSignal2Data,
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
        },
        {
          label: 'Traffic Signal 3 (seconds)',
          data: signal3Data,
          backgroundColor: 'rgba(255, 0, 0, 0.6)',
        },
        {
          label: 'Model Signal 3 (seconds)',
          data: modelSignal3Data,
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
        },
        {
          label: 'Traffic Signal 4 (seconds)',
          data: signal4Data,
          backgroundColor: 'rgba(255, 0, 0, 0.6)',
        },
        {
          label: 'Model Signal 4 (seconds)',
          data: modelSignal4Data,
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
        },
      ],
    };

    setChartData(newChartData);
  };

  // Function to handle AI prediction and show the chart
  const runAIPrediction = () => {
    prepareChartData(); // Prepare the chart data when the button is clicked
    setShowChart(true); // Show the chart
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
          {/* <div>
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
          </div> */}

          {/* Adding Local Video */}
          <iframe width="90%" height="400" 
          src="https://www.youtube.com/embed/fxGRwLt58io?si=HfyH5KcSh2GfwAm9" 
          title="YouTube video player" frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
          </iframe>
        </section>

        {/* AI Prediction Section */}
        <section className="ai-prediction">
          <h3>AI Predicted Signal Timings</h3>
          {/* Conditionally render the chart if showChart is true */}
          {showChart && chartData ? (
            <Bar data={chartData} />
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
