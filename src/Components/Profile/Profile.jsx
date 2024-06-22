import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from '../../Api/api';
import "./Profile.css"; // Import the CSS file

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    postalCode: ""
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get(`/user/${user.id}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    if (user) {
      fetchProfileData();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await api.put(`/user/${user.id}`, profileData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile data:', error);
    }
  };

  const handleCancelClick = () => {
    setProfileData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
      postalCode: user.postalCode || ""
    });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">User Profile</h1>
      <div className="profile-card">
        <div className="profile-avatar">
          <img src="https://via.placeholder.com/150" alt="User Avatar" />
        </div>
        <div className="profile-details">
          {isEditing ? (
            <form className="profile-form">
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={profileData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Postal Code:</label>
                <input
                  type="text"
                  name="postalCode"
                  value={profileData.postalCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-buttons">
                <button type="button" onClick={handleSaveClick} className="save-button">
                  Save
                </button>
                <button type="button" onClick={handleCancelClick} className="cancel-button">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <p>
                <strong>First Name:</strong> {profileData.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {profileData.lastName}
              </p>
              <p>
                <strong>Email:</strong> {profileData.email}
              </p>
              <p>
                <strong>Phone Number:</strong> {profileData.phoneNumber}
              </p>
              <p>
                <strong>Address:</strong> {profileData.address}
              </p>
              <p>
                <strong>Postal Code:</strong> {profileData.postalCode}
              </p>
              <button type="button" onClick={handleEditClick} className="edit-button">
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
