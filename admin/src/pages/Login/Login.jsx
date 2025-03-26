import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = ({url}) => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });

  useEffect(() => {
    console.log("adada", data);
  }, [data]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(url + "/api/admin/login", data);
      if (response.data.success) {
        navigate("/add");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };
  return (
    <div className="loginContainer">
      <form onSubmit={onLogin}>
        <div className="loginWrapper">
          <h1>Login Form</h1>
          <div className="inputUserAdmin">
            <span htmlFor="email">email:</span>
            <input onChange={onChangeHandler} value={data.email} type="email" name="email" />
          </div>
          <div className="inputPasswordAdmin">
            <span htmlFor="password">Password:</span>
            <input onChange={onChangeHandler} value={data.password} type="password" name="password" />
          </div>
          <Link id="registerContext" to="/register">
            Register here.
          </Link>
          <div className="loginRegister">
            <button className="btnLoginAdmin" type="submit">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
