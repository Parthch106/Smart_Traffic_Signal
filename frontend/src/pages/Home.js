import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import './home.css'

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

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
        <div className='body-menu'>
            <div className="Menu-bar">
                <img src="./content/imgs/link.png" height="50px" width="50px"></img>
                <input type="text" placeholder="Search hear"/>
                <div id="home">Home</div>
                <div id="network">My Network</div>
                <div id="jobs">Jobs</div>
                <div id="noti">Notifications</div>
                <div id="settings">Settings</div>
                <div id="logout"><button onClick={handleLogout}>Logout</button></div>
            </div>
            <div className="page-body">
            
            <h1>Welcome {loggedInUser}</h1>
            <div>
                {
                    products && products?.map((item, index) => (
                        <ul key={index}>
                            <span>{item.name} : {item.price}</span>
                        </ul>
                    ))
                }
            </div>
            
            </div>
        </div>
            
            <ToastContainer />
        </div>
            
    )
}

export default Home
