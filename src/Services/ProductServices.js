// src/Services/ProductServices.js
import api from '../Api/api';

export const getProducts = async (params) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params
  };
  return await api.get('/products', config); 
};

// Function to add a product with image
export const addProduct = async (productData) => {
  const token = localStorage.getItem('token'); 
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    },
  };
  return await api.post('/addProduct', productData, config); 
};
