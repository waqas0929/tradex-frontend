// src/Components/OrderList/OrderList.jsx
import React, { useEffect, useState } from 'react';
import api from '../../Api/api';
import './OrderList.css';
import { useAuth } from '../../contexts/AuthContext';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(`/orders/${user.id}`);
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (!orders || !orders.length) {
    return <div>No orders found</div>;
  }

  return (
    <div className="order-list-container">
      <h1>My Orders</h1>
      <div className="order-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            {order.product ? (
              <>
                <img src={order.product.imagePath || '/default-image-path.jpg'} alt={order.product.productName || 'No name available'} />
                <h2>{order.product.productName || 'No name available'}</h2>
                <p>Quantity: {order.quantity}</p>
                <p>Total: Rs. {order.totalAmount}</p>
                <p>Status: {order.status}</p>
              </>
            ) : (
              <div>Product details not available</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
