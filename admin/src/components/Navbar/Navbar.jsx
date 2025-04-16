import React, { useEffect, useState } from "react";
import "./Navbar.css";
import axios from "axios";
import { assets } from "../../assets/assets";
import {  useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../contexy/UserContext";

const Navbar = ({ url }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {list , logout, fetchList  } = useContext(StoreContext);
  const login = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  }
  useEffect(() => {
    console.log("list", list);
    const toggle = document.getElementById("visual-toggle");

    // Function to apply the stored mode preference
    function applyModePreference() {
      const mode = localStorage.getItem("mode");
      if (mode === "light") {
        toggle.checked = true;
        document.body.classList.add("lightcolors");
        document
          .getElementById("visual-toggle-button")
          .classList.add("lightmode");
      } else {
        toggle.checked = false;
        document.body.classList.remove("lightcolors");
        document
          .getElementById("visual-toggle-button")
          .classList.remove("lightmode");
      }
    }

    // Call the function to apply the mode preference on page load
    applyModePreference();

    toggle.addEventListener("change", function () {
      if (toggle.checked) {
        localStorage.setItem("mode", "light");
        document.body.classList.add("lightcolors");
        document
          .getElementById("visual-toggle-button")
          .classList.add("lightmode");
      } else {
        localStorage.setItem("mode", "dark");
        document.body.classList.remove("lightcolors");
        document
          .getElementById("visual-toggle-button")
          .classList.remove("lightmode");
      }
    });
  }, [list]); // Empty dependency array to run the effect only once
  return (
    <div>
      <div className="navbar">
        <div className="navaa">
          <h1>{list?.email ? list.email : "Guest"}</h1>
          <h4>Dashboard {location.pathname}</h4>
        </div>
        <div className="toggle-switch">
          <label
            htmlFor="visual-toggle"
            className="switch-label"
            id="visual-toggle-button"
            onClick={() => visualMode()}
          >
            <input
              type="checkbox"
              className="checkbox visual-toggle"
              id="visual-toggle"
            />
            <span className="slider"></span>
          </label>
        </div>
        {list.email ? (
          <ul onClick={handleLogout} className="nav-profile-dropdown">
            <img src={assets.user} />
            <p>Logout</p>
          </ul>
        ) : (
          <ul onClick={login} className="nav-profile-dropdown">
            <img src={assets.user} />
            <p>Login</p>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
