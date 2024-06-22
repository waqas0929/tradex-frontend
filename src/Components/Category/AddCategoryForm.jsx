import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../Api/api';
import './Modal.css';

Modal.setAppElement('#root');

const AddCategoryForm = ({ isOpen, onRequestClose, onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/category', { categoryName });
      if (response.data) {
        toast.success('Category added successfully!', {
          position: 'top-right',
        });
        onCategoryAdded(response.data.category);
        setCategoryName('');
        onRequestClose();
      }
    } catch (error) {
      toast.error('Error adding category', {
        position: 'top-right',
      });
      console.error('Error adding category:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Category"
      className="Modal"
      overlayClassName="Overlay"
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category Name:</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <button className="add-category-button small" type="submit">
          Add Category
        </button>
      </form>
    </Modal>
  );
};

export default AddCategoryForm;
