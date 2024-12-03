import React, { useEffect, useState } from 'react';
import NavBar from '../Navbar/NavBar';
import './ai.css';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { FaTrafficLight , FaSpinner } from 'react-icons/fa';
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
  const [error, setError] = useState('');
  const [showChart, setShowChart] = useState(false);
  const [isLoadingPrediction, setIsLoadingPrediction] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [chartData, setChartData] = useState(null); // State for storing chart data

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

    // async function fetchModelData() {
    //   try {
    //     const response = await axios.get('http://127.0.0.1:5000/api/model_data');
    //     if (response.data) {
    //       setModelData(response.data);
    //     }
    //   } catch (err) {
    //     setError('Error fetching model data');
    //     console.error('Error fetching model data', err);
    //   }
    // }

    fetchTrafficData();
    // fetchModelData();
  }, []);

  const runAIPrediction = async () => {
    setIsLoadingPrediction(true);
    setResponseMessage(null);
    setChartData(null); // Clear previous chart data before fetching new

    try {
      // POST request to backend to get AI prediction
      const response = await axios.post('http://127.0.0.1:5000/api/predict');
      const predictedTime = response.data.predicted_time;

      const labels = Object.keys(trafficData); // Circle names
      const signal1Data = [];
      const signal2Data = [];
      const signal3Data = [];
      const signal4Data = [];

      Object.values(trafficData).forEach((signals) => {
        signal1Data.push(signals.signal1 || 0);
        signal2Data.push(signals.signal2 || 0);
        signal3Data.push(signals.signal3 || 0);
        signal4Data.push(signals.signal4 || 0);
      });

      // Prepare the chart data 
      const chartData = {
        labels: labels,
      datasets: [
        {
          label: 'Actual signal data (seconds)',
          data: signal1Data,
          backgroundColor: 'rgba(255, 0, 0, 0.6)',
        },
        {
          label: 'Predicted signal data (seconds)',
          data: [predictedTime],
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
        },
      ],
      };

      setChartData(chartData); // Set the chart data to trigger chart display
      setResponseMessage(`Prediction successful: ${predictedTime} seconds`); // Display success message
    } catch (error) {
      console.error('Error running AI prediction:', error);
      setResponseMessage('Error running AI prediction. Please check the backend logs.');
    } finally {
      setIsLoadingPrediction(false);
    }
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
        <div className="ai-container">
        <h2>AI-Powered Traffic Signal Prediction</h2>
        <div>
          <button className='run-ai-btn' onClick={runAIPrediction} disabled={isLoadingPrediction}>
            {isLoadingPrediction ? <FaSpinner className="loading-icon" /> : 'Run AI Prediction'}
          </button>
            {responseMessage && <p>{responseMessage}</p>}
            {/* Conditionally render the chart when data is available */}
            {chartData && <Bar data={chartData} />}
        </div>
      </div>
      </section>
      </div>
    </div>
  );
}

export default Ai;
