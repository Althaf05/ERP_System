import React, { useState } from 'react';
import './ProductsManagement.css';

const initialProducts = [
  { id: 1, name: 'Product 1', category: 'Category 1', price: 10, stockQuantity: 30 },
  { id: 2, name: 'Product 2', category: 'Category 2', price: 20, stockQuantity: 50 },
  { id: 3, name: 'Product 3', category: 'Category 1', price: 15, stockQuantity: 75 },
  { id: 4, name: 'Product 4', category: 'Category 1', price: 18, stockQuantity: 90 }
];

const ProductsManagement = () => {
  const [products, setProducts] = useState(initialProducts);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
    stockQuantity: ''
  });
  const [editMode, setEditMode] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedProducts = products.map(product =>
        product.id === formData.id ? formData : product
      );
      setProducts(updatedProducts);
      setEditMode(false);
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }
    setFormData({
      id: '',
      name: '',
      category: '',
      price: '',
      stockQuantity: ''
    });
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditMode(true);
  };

  const handleDelete = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  return (
    <div className="products">
      <h1>Products Management</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} placeholder="Product Name" onChange={handleChange} required />
        <input type="text" name="category" value={formData.category} placeholder="Category" onChange={handleChange} required />
        <input type="number" name="price" value={formData.price} placeholder="Price" onChange={handleChange} min="0" required />
        <input type="number" name="stockQuantity" value={formData.stockQuantity} placeholder="Stock Quantity" onChange={handleChange} min="1" required />
        <button type="submit">{editMode ? 'Update Product' : 'Add Product'}</button>
      </form>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <span>{product.name} - {product.category} - ${product.price} - {product.stockQuantity} in stock</span>
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsManagement;
