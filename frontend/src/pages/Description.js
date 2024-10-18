import React from 'react';
import NavBar from '../Navbar/NavBar';
import './desc.css';
import { FaTrafficLight, FaRobot, FaDatabase, FaCloud, FaNetworkWired } from 'react-icons/fa';

function Description() {
  return (
    <div>
      <NavBar />
      <section>
        <h2>About the Project</h2>
        <p>
          The Smart Traffic Signal System is an intelligent solution designed to optimize traffic flow in urban environments. By leveraging real-time data from sensors, cameras, and AI algorithms, it adjusts traffic signals dynamically to reduce congestion, improve traffic efficiency, and enhance road safety.
        </p>
      </section>

      <section>
        <h2>Key Features</h2>
        <ul>
          <li><FaTrafficLight /> Real-time traffic monitoring using sensors and cameras.</li>
          <li><FaTrafficLight /> Adaptive signal timing based on traffic conditions.</li>
          <li><FaTrafficLight /> Reduced wait times at intersections during off-peak hours.</li>
          <li><FaTrafficLight /> Energy-efficient and environmentally friendly operation.</li>
        </ul>
      </section>

      <section>
        <h2>Benefits</h2>
        <ul>
          <li>Minimizes traffic congestion and reduces delays.</li>
          <li>Improves road safety by reducing accident risks at intersections.</li>
          <li>Facilitates faster movement of emergency vehicles.</li>
          <li>Reduces fuel consumption and emissions by optimizing traffic flow.</li>
        </ul>
      </section>

      <section>
        <h2>Technologies Used</h2>
        <ul>
          <li><FaRobot /> Artificial Intelligence and Machine Learning</li>
          <li><FaNetworkWired /> Edge Computing</li>
          <li><FaRobot /> Machine Vision</li>
          <li><FaNetworkWired /> Wireless Communication</li>
          <li><FaCloud /> Data Analytics and Cloud Platforms</li>
          <li><FaDatabase /> Database Management</li>
        </ul>
      </section>

      <section>
        <h2>Project Members</h2>
        <ul>
          <li>Yash Kalathiya</li>
          <li>Parth Chauhan</li>
          <li>Rudraksh Mehta</li>
          <li>Dhruvina Ghodadara</li>
          <li>Disha Gopani</li>
          <li>Jay Kanavia</li>
        </ul>
      </section>
    </div>
  );
}

export default Description;
