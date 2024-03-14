// ProductsManagement.js
import React, { useState, useEffect } from 'react';
import './ProductsManagement.css';

// Initial list of products
const initialProducts = [
  { id: 1, name: 'Product 1', category: 'Category 1', price: 10, stockQuantity: 30 },
  { id: 2, name: 'Product 2', category: 'Category 2', price: 20, stockQuantity: 50 },
  { id: 3, name: 'Product 3', category: 'Category 1', price: 15, stockQuantity: 75 },
  { id: 4, name: 'Product 4', category: 'Category 5', price: 18, stockQuantity: 90 },
  { id: 5, name: 'Product 5', category: 'Category 7', price: 54, stockQuantity: 21 },
  { id: 6, name: 'Product 6', category: 'Category 2', price: 59, stockQuantity: 32 },
  { id: 7, name: 'Product 7', category: 'Category 2', price: 40, stockQuantity: 54 },
  { id: 8, name: 'Product 8', category: 'Category 3', price: 54, stockQuantity: 75 },
  { id: 9, name: 'Product 9', category: 'Category 3', price: 95, stockQuantity: 35 },
  { id: 10, name: 'Product 10', category: 'Category 3', price: 32, stockQuantity: 75 },
];

const ProductsManagement = ({ onProductCountChange }) => {
  // State variables
  const [products, setProducts] = useState(initialProducts);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
    stockQuantity: ''
  });

  // Effect to update product count whenever products change
  useEffect(() => {
    onProductCountChange(products.length);
  }, [products, onProductCountChange]);

  // Function to handle form input change
  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'price' || e.target.name === 'stockQuantity') {
      value = Math.max(1, parseInt(value)); 
    }
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Editing an existing product
      const updatedProducts = products.map(product =>
        product.id === formData.id ? formData : product
      );
      setProducts(updatedProducts);
    } else {
      // Adding a new product
      const newProduct = { ...formData, id: Date.now() };
      setProducts([...products, newProduct]);
    }
    // Clear form data after submission
    setFormData({
      id: '',
      name: '',
      category: '',
      price: '',
      stockQuantity: ''
    });
  };

  // Function to handle editing a product
  const handleEdit = (productId) => {
    const editedProduct = products.find(product => product.id === productId);
    setFormData(editedProduct);
  };

  // Function to handle deleting a product
  const handleDelete = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  return (
    <div className="products">
      <h1>Products Management</h1>
      {/* Product form */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} placeholder="Product Name" onChange={handleChange} required />
        <input type="text" name="category" value={formData.category} placeholder="Category" onChange={handleChange} required />
        <input type="number" name="price" value={formData.price} placeholder="Price" onChange={handleChange} min="0" required />
        <input type="number" name="stockQuantity" value={formData.stockQuantity} placeholder="Stock Quantity" onChange={handleChange} min="1" required />
        <button type="submit">{formData.id ? 'Update Product' : 'Add Product'}</button>
      </form>
      {/* Product list */}
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <span>{product.name} - {product.category} - ${product.price} - {product.stockQuantity} in stock</span>
            <button onClick={() => handleEdit(product.id)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsManagement;

