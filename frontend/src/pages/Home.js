import React, { useEffect, useState } from 'react'
import './home.css'
import NavBar from '../Navbar/NavBar';
import axios from 'axios';

function Home() {
    
    const [loggedInUser, setLoggedInUser] = useState('');
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const [savedData, setSavedData] = useState({});

    const fetchSavedData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:5000/api/data');
          setSavedData(response.data);
        } catch (error) {
          console.error('Error fetching saved data:', error);
        }
      };
      useEffect(() => {
        fetchSavedData();
      }, []);

    return (
        <div>
        <NavBar></NavBar>
        <div className='body-menu'>
            <h1>Welcome {loggedInUser}</h1>
            <div>
            
      {Object.keys(savedData).length > 0 ? (
        <table border="1" cellPadding="10" style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
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
            {Object.entries(savedData).map(([circleName, signals], index) => (
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
        </div>
        </div> 
    )
}

export default Home
