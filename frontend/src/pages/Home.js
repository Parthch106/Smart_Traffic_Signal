import React, { useEffect, useState } from 'react';
import './home.css';
import NavBar from '../Navbar/NavBar';
import axios from 'axios';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');

  const backgroundImages = [
    'url(https://cdn.pixabay.com/photo/2017/03/20/11/15/traffic-2158790_1280.jpg)',
   
  ];

  // Fetch the saved data and logged-in user
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
    setBackgroundImage(backgroundImages[0]);

    // Rotate background images
    const interval = setInterval(() => {
      setBackgroundImage((prevImage) => {
        const nextIndex = (backgroundImages.indexOf(prevImage) + 1) % backgroundImages.length;
        return backgroundImages[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <NavBar />
      <div
        className="home-container"
        style={{
          backgroundImage: backgroundImage,
        }}
      >
        <h1 className="welcome-message">
          Welcome to Our Traffic Management System!
        </h1>
        {loggedInUser && (
          <h2 className="user-greeting">Hello, {loggedInUser}!</h2>
        )}
        <p className="slogan">
          "Optimizing Traffic, Driving Efficiency."
        </p>
      </div>
    </div>
  );
}

export default Home;
