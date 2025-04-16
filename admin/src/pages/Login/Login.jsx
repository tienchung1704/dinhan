import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../contexy/UserContext";
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";

const Login = ({ url }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const { handleLogin, fetchList } = useContext(StoreContext);
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
        toast.success("Đăng nhập thành công!");
        localStorage.setItem("userId", response.data.data.id);        localStorage.setItem("userId", response.data.data.id);
        handleLogin();
        navigate("/");
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
            <input
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              name="email"
            />
          </div>
          <div className="inputPasswordAdmin">
            <span htmlFor="password">Password:</span>
            <input
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              name="password"
            />
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
