import React from 'react'
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
 function Registerpage() {
  return (
    
      <div className='wrapper2'>
      <form>
        <div className="heading">
            <h1>Registration Form</h1>
        </div>
        <div className="username">
            <input type="text" placeholder='Username' required /><FaUser className='icon1'/>
        </div>
        <div className="password">
            <input type="email"placeholder='Email' required /><FaEnvelope className='icon2'/>
        </div>
        <div className="username">
            <input type="password" placeholder='Password' required /><FaLock className='icon1'/>
        </div>
        <div className="checkbox1">
            <label><input type="checkbox" />I Agree to all terms and conditions</label>
            
        </div>
        <div className="login-btn">
            <button>Create a new account</button>
        </div>
        <div className="account-register">
            <p>Already have an account?<Link to="/">Login</Link></p>
        </div>
      </form>
    </div>
    
  )
}
export default Registerpage;