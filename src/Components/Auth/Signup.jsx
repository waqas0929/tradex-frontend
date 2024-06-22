// src/Components/Auth/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/api";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await api.post("/signup", {
        email,
        password,
        firstName,
        lastName,
      });
      setSuccess(true);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to signup");
    }
  };

  const handleRedirectToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      {success ? (
        <div className="success-message">
          <p>Account created successfully!</p>
          <button onClick={handleRedirectToLogin} className="login-button">
            Login
          </button>
        </div>
      ) : (
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="signup-button">
            Sign up
          </button>
        </form>
      )}
    </div>
  );
};

export default Signup;
