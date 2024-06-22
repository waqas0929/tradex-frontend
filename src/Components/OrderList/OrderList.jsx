import React, { useEffect, useState } from 'react';
import api from '../../Api/api';
import { useAuth } from '../../contexts/AuthContext';
import './OrderList.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/order/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetched Orders:", response.data); // Debugging statement
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="order-list-container">
      <h1>My Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="order-item">
            <img src={`http://localhost:3000${order.product.imagePath}`} alt={order.product.productName} />
            <div className="order-details">
              <h2>{order.product.productName}</h2>
              <p>Quantity: {order.quantity}</p>
              <p>Total Price: ${order.totalAmount}</p>
              <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderList;
