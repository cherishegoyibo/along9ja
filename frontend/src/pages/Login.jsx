
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/Login.css";

const LOGIN_URL = "https://along9ja-backend.onrender.com/loginuser"; // Replace with your backend endpoint

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  // Check session on mount
   // Adding 'navigate' as a dependency to avoid stale closure

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrMsg("");
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      const userData = response.data;

    localStorage.setItem("userSession", JSON.stringify(userData));
    // setUser(userData);
      setEmail("");
      setPassword("");
      console.log("navigating to /home");
      navigate("/home");
      window.location.reload();
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 401) {
        setErrMsg("Invalid Email or Password");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <div className="login-container">
      <video
        className="background-video"
        src="../../images/po.mp4"
        muted
        loop
        autoPlay
        type="video/mp4"
      ></video>
      <div className="login-content">
        <img src="../../images/ok3.png" alt="" width="350px" />
        <form className="login-form" onSubmit={handleLogin}>
          <button type="button" className="google-logingg">
            U fit use Google sign in
          </button>
          <div className="separator">OR</div>
          {errMsg && <p className="error-message">{errMsg}</p>}
          <input
            type="email"
            placeholder="Drop Email for us"
            required
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="oya Enter ur password "
            required
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="email-login">
            Carry Go
          </button>
        </form>
        <div className="signup-link">
          No Lie U Get Account? <Link to="/sign-up">Oya Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
