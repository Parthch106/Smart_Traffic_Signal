import React, { useEffect, useState } from 'react';
import './home.css';
import NavBar from '../Navbar/NavBar';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');

    // Array of background images
    const backgroundImages = [
        'url(https://imgs.search.brave.com/PxNtGNHr8zj29bYd2p1iP4W3OAwaM5fbh77_souJH14/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTk4/NjU4ODMwL3Bob3Rv/L3RyYWZmaWNfamFt/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1qbVhzME5zZFdZ/WkVfa25pb0NPOUNa/RVFxZG00LXllemZC/WlhGdElxTmJvPQ)',
        'url(https://imgs.search.brave.com/-qslIUMUOyr9wR4p4k51sKr_vI1Xnt4OMk6_QCRILUI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5jbm4uY29tL2Fw/aS92MS9pbWFnZXMv/c3RlbGxhci9wcm9k/LzIwMTAxODA4MzMx/OS1zbWFydC10cmFm/ZmljLWxpZ2h0cy10/aW1lLXRyYW5zZm9y/bWVkLmpwZz9xPXhf/Mix5XzAsaF8xMDc4/LHdfMTkxNSxjX2Ny/b3Avd18xMjgw)',
        'url(https://imgs.search.brave.com/L99rEZewMiGYCajW6jdob1nUyc1029795C8UrapdQHc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZS1jb25zeXN0ZW1z/LmNvbS9pbWFnZXMv/bWFya2V0cy9zbWFy/dC10cmFmZmljL3Nt/YXJ0LWNpdHktdHJh/ZmZpYy1tYW5hZ2Vt/ZW50LXN5c3RlbXMu/anBn)'
    
    ];

    // Set the logged-in user from localStorage
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    // Change the background image every 3 seconds
    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            setBackgroundImage(backgroundImages[index]);
            index = (index + 1) % 3; // Loop through the images
        }, 3000); // Change every 3 seconds

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <NavBar />
            <div 
                className="home-container" 
                style={{
                    backgroundImage: backgroundImage,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    transition: 'background-image 1s ease-in-out'
                }}
            >
                <h1 
                    className="welcome-message" 
                    style={{ fontSize: '2.5rem', color: '#4B0082', fontFamily: "Playwrite GB S ,cursive" }}
                >
                    Welcome to our website!
                </h1>
                {loggedInUser && (
                    <h2 
                        className="user-greeting" 
                        style={{ fontSize: '1.8rem', color: '#003366', fontFamily: 'Arial, sans-serif' }}
                    >
                        Hello, {loggedInUser}!
                    </h2>
                )}
                <p 
                    className="slogan" 
                    style={{ fontSize: '1.5rem', color: '#000080', fontFamily: 'Verdana, sans-serif', marginTop: '20px' }}
                >
                    We are glad to have you here. Explore and enjoy our services.
                </p>
            </div>
        </div>
    );
}

export default Home;
