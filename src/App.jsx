// App.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Products from "./Components/Product/ProductsList";
import OrderList from "./Components/OrderList/OrderList";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Dashboard from "./Components/Dashboard/Dashboard";
import AddProductForm from "./Components/Product/AddProductForm";
import ProductList from "./Components/Product/ProductsList"; // Correct the import path
import Cart from "./Components/Cart/Cart";
import BuyNow from "./Components/BuyNow/BuyNow";
import ContactUs from "./Components/ContactUs/ContactUs";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import AboutUs from "./Components/AboutUs/AboutUs";
import Navigation from "./Components/Layout/Navigation"; // Use Navigation instead of Header
import Profile from "./Components/Profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./Components/privateRoute";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navigation setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route
          path="/Products"
          element={<ProductList searchQuery={searchQuery} />}
        />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <OrderList />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <PrivateRoute>
              <AddProductForm />
            </PrivateRoute>
          }
        />
        <Route path="/buyNow" element={<BuyNow />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
