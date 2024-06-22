import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart, faBars } from "@fortawesome/free-solid-svg-icons";
import "./Navigation.css";
import logo from '../../assets/tadexx-logo.jpg'; // Assuming the logo is here
import { useAuth } from "../../contexts/AuthContext";

const Navigation = ({ setSearchQuery }) => {
  const [searchInput, setSearchInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout, loading, user } = useAuth();
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(searchInput);
    navigate("/products");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout(() => {
      navigate("/Home");
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="navigation-container">
      <div className="header-content">
        <img src={logo} alt="Logo" className="header-logo" />
        <h1 className="header-title">Tradexx</h1>
      </div>
      <div className="icon-container">
        <Link to="/profile">
          <FontAwesomeIcon icon={faUser} className="nav-icon" />
        </Link>
        <Link to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} className="nav-icon" />
        </Link>
        <FontAwesomeIcon icon={faBars} className="nav-icon hamburger" onClick={toggleMenu} />
      </div>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <li>
          <Link to="/Home">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        {isAuthenticated && user.role === "admin" && (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/add-product">Add Product</Link>
            </li>
          </>
        )}
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/orders">My Orders</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="nav-button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
