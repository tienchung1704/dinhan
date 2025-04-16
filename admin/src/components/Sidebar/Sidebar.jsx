import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import {  useContext } from "react";
import { StoreContext } from "../../contexy/UserContext";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ url }) => {
  const { list, logout } = useContext(StoreContext);
  const navigate = useNavigate();
  const login = () => {
    navigate('/login');
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  }
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <div className="card p-5 shadow-purple-200/50 rounded-md">
          <ul className="w-full flex flex-col gap-2">
            <h2>Admin Dashboard</h2>
            <button
              className={`flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap ${
                list.role === "user" ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <NavLink to="/add">
                <div className="btnText">
                  <img src={assets.add} alt="add" className="w-4 h-4" />
                  <p>Add Items</p>
                </div>
              </NavLink>
            </button>
            <button
              className={`flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap ${
                list.role === "user" ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <NavLink to="/addpost">
                <div className="btnText">
                  <img src={assets.post} alt="add post" className="w-4 h-4" />
                  <p>Add Post</p>
                </div>
              </NavLink>
            </button>
            <button className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
              <NavLink to="/list">
                <div className="btnText">
                  <img
                    src={assets.table}
                    alt="list items"
                    className="w-4 h-4"
                  />
                  <p>List Items</p>
                </div>
              </NavLink>
            </button>
            <button className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
              <NavLink to="/orders">
                <div className="btnText">
                  <img src={assets.order} alt="orders" className="w-4 h-4" />
                  <p>Orders</p>
                </div>
              </NavLink>
            </button>
            <button className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
              <NavLink to="/posts">
                <div className="btnText">
                  <img src={assets.post} alt="list posts" className="w-4 h-4" />
                  <p>List Posts</p>
                </div>
              </NavLink>
            </button>
            <button className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
              <NavLink to="/contact">
                <div className="btnText">
                  <img
                    src={assets.table}
                    alt="list contact"
                    className="w-4 h-4"
                  />
                  <p>List Contact</p>
                </div>
              </NavLink>
            </button>
            <h2>Auth Pages</h2>
            <button
              onClick={login}
              className={`flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap ${
                list.email ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <div className="btnText">
                <img
                  src={assets.login}
                  alt="list contact"
                  className="w-4 h-4"
                />
                <p>Login</p>
              </div>
            </button>
            <button className="flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap">
              <NavLink to="/register">
                <div className="btnText">
                  <img
                    src={assets.login}
                    alt="list contact"
                    className="w-4 h-4"
                  />
                  <p>Register</p>
                </div>
              </NavLink>
            </button>
            <button
              onClick={handleLogout}
              className={`flex-center cursor-pointer p-16-semibold w-full whitespace-nowrap ${
                !list.email ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <div className="btnText">
                <img src={assets.logout} alt="logout" className="w-4 h-4" />
                <p>Logout</p>
              </div>
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
