// src/Components/ProductCard/ProductCard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../Api/api';
import { useAuth } from '../../contexts/AuthContext'; // Import the useAuth hook
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBuyNow = async () => {
    try {
      const response = await api.post('/buyNow', {
        userId: user.id, 
        productId: product.id,
        quantity,
      });
      console.log('User Details:', user);
      // Pass the entire product object along with the sale data and user details
      navigate('/buyNow', { state: { sale: { ...response.data.sale, product }, user } });
    } catch (error) {
      console.error('Error buying product:', error);
      toast.error('Failed to process the purchase.');
    }
  };

  const handleAddToCart = async () => {
    try {
      await api.post('/addToCart', {
        userId: user.id, // Use the actual user ID from the authentication context
        productId: product.id,
        quantity,
      });
      toast.success('Added to cart successfully!', {
        position: 'top-center',
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add to cart.');
    }
  };

  return (
    <div className="product-card">
      <div className="nearest-seller-badge">Nearest Seller</div>
      <img src={`http://localhost:3000${product.imagePath}`} alt={product.productName} />
      <h2>{product.productName}</h2>
      <p>Shipped in 3-4 days</p>
      <p className="price">${product.price}</p>
      <div className="button-container">
        <button onClick={handleAddToCart} className="add-cart-button">Add Cart</button>
        <button onClick={handleBuyNow} className="button">Buy</button>
      </div>
    </div>
  );
};

export default ProductCard;
