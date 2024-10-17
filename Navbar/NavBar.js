import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { handleSuccess } from '../utils';
// import { ToastContainer } from "react-toastify";
import "./NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const handleClick = () => setClick(!click);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/home"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                <p>Home</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/desc"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                <p>Description</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/man"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                <p>Manual</p>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/ai"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                <p>AI (Demo)</p>
              </NavLink>
            </li>
            <li>
              <div id="logout">
                <button className="button2" onClick={handleLogout}><p>Logout</p></button>
              </div>
            </li>
          </ul>
        </div>
        {/* <ToastContainer /> */}
      </nav>
    </>
  );
}

export default NavBar;
