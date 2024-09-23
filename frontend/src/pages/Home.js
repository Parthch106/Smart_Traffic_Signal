import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError } from '../utils';
import './home.css'
import NavBar from '../Navbar/NavBar';
import axios from 'axios' 

function Home() {

    const [name, setName] = useState('');
    const [postMessage, setPostMessage] = useState('');
    const [getGreet, setGetGreet] = useState('');

    const handlePostRequest = async () => {
        try {
        const response = await axios.post('http://127.0.0.1:5000/api/data', { name });
        setPostMessage(response.data.message);
        } catch (error) {
        console.error('Error with POST request:', error);
        }
    };

    const handleGetRequest = async () => {
        try {
        const response = await axios.get(`http://127.0.0.1:5000/api/greet/${name}`);
        setGetGreet(response.data.greeting);
        } catch (error) {
        console.error('Error with GET request:', error);
        }};
        
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:8080/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);
        } catch (err) {
            handleError(err);
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div>
        <NavBar></NavBar>
        <div className='body-menu'>
            <h1>Welcome {loggedInUser}</h1>
            <div>
                {
                    // products && products?.map((item, index) => (
                    //     <ul key={index}>
                    //         <span>{item.name} : {item.price}</span>
                    //     </ul>
                    // ))
                }
            </div>
        </div>
        <h1>Flask API with React</h1>

      <h3>POST request (Send your name)</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={handlePostRequest}>Send Name (POST)</button>
      <p>{postMessage}</p>

      <h3>GET request (Dynamic URL)</h3>
      <button onClick={handleGetRequest}>Greet (GET)</button>
      <p>{getGreet}</p>
        </div>
        
            
            
            
    )
}

export default Home
