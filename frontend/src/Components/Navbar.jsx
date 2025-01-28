import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("https://along9ja.onrender.com/logout", {
        method: "POST",
        credentials: "include", // Include cookies to maintain session
      });
      localStorage.removeItem("userSession");
      navigate("/"); // Redirect to home page after logout
      
    } catch (err) {
      console.error("Logout Error:", err);
    }
    
  };

  return (
    <header>
      <div className="primary-header">
        <div className="header-logo">
          <a href="/home">
            <img
              src="./images/along9ja.png"
              alt="Along9ja logo"
              width="160"
              height="60"
            />
          </a>
        </div>

        <label htmlFor="check" className="open-menu">
          <i className="fa-solid fa-bars"></i>
        </label>
        <nav>
          <label htmlFor="check" className="close-menu">
            <i className="fa-solid fa-xmark"></i>
          </label>
          <ul className="nav-bar">
            <input type="checkbox" id="check" />
            <li className="nav-item">
              <a href="/home" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="/explore-routes" className="nav-link">
                Explore Routes
              </a>
            </li>
            <li className="nav-item">
              <a href="/nearby-buses" className="nav-link">
                Nearby Buses
              </a>
            </li>
            <li className="nav-item">
              <a href="/about-us" className="nav-link">
                About Us
              </a>
            </li>
            {user && ( // Only display the logout button if the user is logged in
              <li className="nav-item">
                <button onClick={handleLogout} className="logout-btn" type="button">
                  Logout
                  <i className="fa-solid arrow fa-arrow-right-to-bracket"></i>
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
