import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import './home.css'
import NavBar from '../Navbar/NavBar';

function Home() {
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
        </div>
        
            
            
            
    )
}

export default Home
