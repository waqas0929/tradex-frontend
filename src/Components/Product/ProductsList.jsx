// ProductList.jsx

import React, { useEffect, useState } from 'react';
import api from '../../Api/api';
import ProductCard from '../Home/ProductCard'; // Adjust the import path if necessary
import './ProductList.css';

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        if (searchQuery) {
          const filteredProducts = response.data.filter(product =>
            product.productName.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setProducts(filteredProducts);
        } else {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  return (
    <div className="product-list-container">
      <h1>Products</h1>
      <div className="products-list">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
