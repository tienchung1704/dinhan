import React, { useEffect, useState } from "react";
import "./Navbar.css";
import axios from "axios";
import {toast} from "react-toastify"
import { assets } from "../../assets/assets";

const Navbar = ({url}) => {
    const [list, setList] = useState([]);
  
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/admin/list`);
    if (response.data.success) {
      console.log(response.data.data);
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  useEffect(() => {
    fetchList();
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
  }, []); // Empty dependency array to run the effect only once
  return (
    <div>
      <div className="navbar">
        <h1>Xin Chao: {list[0].email}</h1>
        <div className="toggle-switch">
          <label
            htmlFor="visual-toggle"
            className="switch-label"
            id="visual-toggle-button"
            onClick="visualMode()"
          >
            <input
              type="checkbox"
              className="checkbox visual-toggle"
              id="visual-toggle"
            />
            <span className="slider"></span>
          </label>
        </div>
        <img className="profile" src={assets.profile_image} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
