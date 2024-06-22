import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import './Logout.css';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(() => {
      navigate("/"); 
    });
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="logout-container">
      <h1>Logout</h1>
      <p>Are you sure you want to logout?</p>
      <div className="button-container">
        <button onClick={handleLogout} className="button logout-button">Logout</button>
        <button onClick={handleCancel} className="button cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default Logout;
