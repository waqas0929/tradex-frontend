import React, { useEffect, useState } from 'react';
import api from '../../Api/api';
import './Cart.css';
import { useAuth } from "../../contexts/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [voucherCode, setVoucherCode] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get(`/cart/${user.id}`);
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    if (user) {
      fetchCartItems();
    }
  }, [user]);

  const handleRemoveFromCart = async (productId) => {
    try {
      await api.delete(`/cart/${user.id}/${productId}`);
      setCartItems(cartItems.filter(item => item.Product.id !== productId));
      setSelectedItems(selectedItems.filter(id => id !== productId));
      toast.success('Item removed from cart successfully!', {
        position: 'top-center',
      });
    } catch (error) {
      console.error('Error removing product from cart:', error);
      toast.error('Failed to remove item from cart.');
    }
  };

  const handleBuyNow = async () => {
    try {
      for (const item of cartItems) {
        if (selectedItems.includes(item.Product.id)) {
          await api.post('/buyNow', {
            userId: user.id,
            productId: item.Product.id,
            quantity: item.quantity,
          });
        }
      }
      toast.success('Purchase successful!', {
        position: 'top-center',
      });
      setCartItems(cartItems.filter(item => !selectedItems.includes(item.Product.id))); // Optionally remove the item from cart after purchase
    } catch (error) {
      console.error('Error buying product:', error);
      toast.error('Failed to process the purchase.');
    }
  };

  const calculateTotal = () => {
    return selectedItems.reduce((acc, id) => {
      const item = cartItems.find(item => item.Product.id === id);
      return acc + item.Product.price * item.quantity;
    }, 0);
  };

  const handleQuantityChange = async (productId, change) => {
    const item = cartItems.find(item => item.Product.id === productId);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      try {
        await api.put(`/cart/${user.id}/${productId}`, { quantity: newQuantity });
        setCartItems(cartItems.map(item => {
          if (item.Product.id === productId) {
            return {
              ...item,
              quantity: newQuantity
            };
          }
          return item;
        }));
      } catch (error) {
        console.error('Error updating quantity:', error);
        toast.error('Failed to update quantity.');
      }
    }
  };

  const handleSelectItem = (productId) => {
    if (selectedItems.includes(productId)) {
      setSelectedItems(selectedItems.filter(id => id !== productId));
    } else {
      setSelectedItems([...selectedItems, productId]);
    }
  };

  return (
    <div className="cart-page-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
      </div>
      <div className="cart-content">
        <div className="cart-items-section">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.Product.id)}
                    onChange={() => handleSelectItem(item.Product.id)}
                  />
                </div>
                <div className="item-details">
                  <img src={item.Product.imagePath || '/default-image-path.jpg'} alt={item.Product.productName} />
                  <div className="item-info">
                    <h2>{item.Product.productName}</h2>
                    <p>Color: {item.Product.color}</p>
                    <p>Earliest Delivery: {new Date().toLocaleDateString()}</p>
                    <div className="item-actions">
                      <button className="remove-button" onClick={() => handleRemoveFromCart(item.Product.id)}>Delete</button>
                    </div>
                  </div>
                </div>
                <div className="item-quantity">
                  <button onClick={() => handleQuantityChange(item.Product.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.Product.id, 1)}>+</button>
                </div>
                <div className="item-price">
                  <p>Rs. {item.Product.price * item.quantity}</p>
                  <p className="original-price">Rs. {item.Product.originalPrice}</p>
                  <p className="discount">-{Math.round(((item.Product.originalPrice - item.Product.price) / item.Product.originalPrice) * 100)}%</p>
                </div>
              </div>
            ))
          ) : (
            <p>No items in the cart.</p>
          )}
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <p>Subtotal ({selectedItems.length} items)</p>
          <div className="voucher">
            <input
              type="text"
              placeholder="Enter Voucher Code"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
            />
            <button className="apply-button">Apply</button>
          </div>
          <p className="total">Total: Rs. {calculateTotal()}</p>
          <button className="checkout-button" onClick={handleBuyNow}>PROCEED TO CHECKOUT ({selectedItems.length})</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
