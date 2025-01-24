// Code to display the login page
import React from 'react';
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <video className="background-video" autoPlay loop muted>
        <source src="/path-to-video/african-bus-scene.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="login-content">
        <h1>Welcome Back!</h1>
        <form className="login-form">
          <button type="button" className="google-login">Sign in with Google</button>
          <div className="separator">or</div>
          <input type="email" placeholder="Email" required className="input-field" />
          <input type="password" placeholder="Password" required className="input-field" />
          <button type="submit" className="email-login">Sign In</button>
        </form>
        <div className="signup-link">
          Don’t have an account? <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;