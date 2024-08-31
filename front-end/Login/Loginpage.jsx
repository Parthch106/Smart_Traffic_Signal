import React from 'react'
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import "./Login.css";
import { Link } from "react-router-dom";
export default function Loginpage() {
  return (
    <div className="form">
      <div className='wrapper'>
      <form>
        <div className="heading">
            <h1>Login</h1>
        </div>
        <div className="username">
            <input type="text" placeholder='Username' required /><FaUser className='icon1'/>
        </div>
        <div className="password">
            <input type="password"placeholder='Password' required /><FaLock className='icon2'/>
        </div>
        <div className="checkbox">
            <label><input type="checkbox" />Remember Me</label>
            <a href="#">Forgot Password</a>
        </div>
        <div className="login-btn">
            <button>Login</button>
        </div>
        <div className="account-register">
            <p>Don't have an account?<Link to="/Register">Register</Link></p>
        </div>
      </form>
    </div>
    
    </div>
    
  )
}
