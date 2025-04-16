import React, { useState, useEffect } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ url }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    console.log("adada", data);
  }, [data]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(url + "/api/admin/register", data);
      if (response.data.success) {
        navigate("/login");
        toast.success("Đăng ký thành công!");
        window.location.reload();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };
  return (
    <div className="registerContainer">
      <form onSubmit={onRegister}>
        <div className="loginWrapper1">
          <h1>Register Form</h1>
          <div className="inputNameAdmin1">
            <span htmlFor="name">Name:</span>
            <input
              onChange={onChangeHandler}
              type="text"
              value={data.name}
              name="name"
            />
          </div>
          <div className="inputUserAdmin1">
            <span htmlFor="email">email:</span>
            <input
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              name="email"
            />
          </div>
          <div className="inputPasswordAdmin1">
            <span htmlFor="password">Password:</span>
            <input
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              name="password"
            />
          </div>
          <Link id="registerContext1" to="/login">
            Already have an account?
          </Link>
          <div className="loginRegister1">
            <button className="btnLoginAdmin" type="submit">
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
