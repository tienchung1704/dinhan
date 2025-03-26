import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route, useLocation } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Posts from "./pages/Posts/posts";
import Postadd from "./pages/AddPost/Postadd";
import Contact from "./pages/Contact/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProduct from "./pages/EditProduct/EditProduct.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";

const App = () => {
  const url = "http://localhost:4000";
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  return (
    <div>
      <ToastContainer />
      <Navbar url={url} />
      <hr />
      <div className="app-content">
      {!isAuthPage && <Sidebar />}
        <Routes>
          <Route path="/login" element={<Login url={url} />} />
          <Route path="/register" element={<Register url={url} />} />
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
          <Route path="/posts" element={<Posts url={url} />} />
          <Route path="/addpost" element={<Postadd url={url} />} />
          <Route path="/contact" element={<Contact url={url} />} />
          <Route path="/edit/:id" element={<EditProduct url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
