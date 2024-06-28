import React, { useState, useEffect } from 'react';
import api from '../../Api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCategoryForm from '../Category/AddCategoryForm';
import './AddProductForm.css';

const AddProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productData, setProductData] = useState({
    productName: '',
    price: '',
    description: '',
    stock: '',
    image: null,
    color: '',
    originalPrice: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryAdded = (newCategory) => {
    setCategories([...categories, newCategory]);
    setSelectedCategory(newCategory.id);
  };

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === 'add_new') {
      setShowAddCategory(true);
      setSelectedCategory('');
    } else {
      setSelectedCategory(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in productData) {
      formData.append(key, productData[key]);
    }
    formData.append('categoryId', selectedCategory);

    try {
      const response = await api.post('/addProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Product added successfully', {
        position: 'top-right',
      });

      // Clear the form fields
      setProductData({
        productName: '',
        price: '',
        description: '',
        stock: '',
        image: null,
        color: '',
        originalPrice: '',
      });
      setSelectedCategory('');

    } catch (error) {
      toast.error('Product with this name is already added', {
        position: 'top-right',
      });
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <h1>Add Product</h1>
        <div className="form-group">
          <label>Category:</label>
          <select className="form-control" value={selectedCategory} onChange={handleCategoryChange} required>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.categoryName}</option>
            ))}
            <option value="add_new">Add New Category</option>
          </select>
        </div>
        <div className="form-group">
          <label>Product Name:</label>
          <input type="text" name="productName" value={productData.productName} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input type="number" name="price" value={productData.price} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={productData.description} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Stock:</label>
          <input type="number" name="stock" value={productData.stock} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Color:</label>
          <input type="text" name="color" value={productData.color} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Original Price:</label>
          <input type="number" name="originalPrice" value={productData.originalPrice} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input type="file" name="image" onChange={handleFileChange} required />
        </div>
        <button className="add-product-button" type="submit">Add Product</button>
      </form>
      <AddCategoryForm
        isOpen={showAddCategory}
        onRequestClose={() => setShowAddCategory(false)}
        onCategoryAdded={handleCategoryAdded}
      />
      <ToastContainer />
    </div>
  );
};

export default AddProductForm;
