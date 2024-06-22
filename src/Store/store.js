// src/Store/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import productReducer from './ProductSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer
  },
});

export default store;
