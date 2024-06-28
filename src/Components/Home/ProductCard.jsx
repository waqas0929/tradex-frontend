import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../Api/api';
import { useAuth } from '../../contexts/AuthContext';
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
      navigate('/buyNow', { state: { sale: { ...response.data.sale, product }, user } });
    } catch (error) {
      console.error('Error buying product:', error);
      toast.error('Failed to process the purchase.');
    }
  };

  const handleAddToCart = async () => {
    try {
      await api.post('/addToCart', {
        userId: user.id,
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
      <img 
        src={`http://localhost:3001${product.imagePath}`} 
        alt={product.productName} 
        onLoad={(e) => e.target.classList.remove('hidden')}
        onError={(e) => console.error(`Error loading image: ${e.target.src}`)}
      />
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
