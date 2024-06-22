// src/components/BuyNow/BuyNow.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import './BuyNow.css';

const BuyNow = () => {
  const location = useLocation();
  const { sale, user } = location.state || {};

  if (!sale || !user) {
    return <div>No sale or user information available</div>;
  }

  return (
    <div className="buy-now-container">
      <h1>Order Summary</h1>
      <div className="order-details">
        {sale.product && (
          <>
            <img src={`http://localhost:3000${sale.product.imagePath}`} alt={sale.product.productName} />
            <h2>{sale.product.productName}</h2>
          </>
        )}
        <p>Quantity: {sale.quantity}</p>
        <p>Total Price: ${sale.totalAmount}</p>
        <h3>Shipping Information</h3>
        <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Postal Code:</strong> {user.postalCode}</p>
      </div>
    </div>
  );
};

export default BuyNow;
