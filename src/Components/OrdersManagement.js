// OrdersManagement.js
import React, { useState, useEffect } from 'react';
import './OrdersManagement.css';

// Initial list of orders
const initialOrders = [
  { id: 1, customerName: 'Ajay', orderDate: '02-03-2024', status: 'Pending' },
  { id: 2, customerName: 'Abhiram', orderDate: '05-03-2024', status: 'Delivered' },
  { id: 3, customerName: 'Rohan', orderDate: '03-03-2024', status: 'Processing' },
  { id: 4, customerName: 'Rithwik', orderDate: '29-02-2024', status: 'Pending' },
  { id: 5, customerName: 'Uday', orderDate: '06-03-2024', status: 'Processing' },
  { id: 6, customerName: 'Althaf', orderDate: '03-03-2024', status: 'Delivered' },
  { id: 7, customerName: 'Mahammad', orderDate: '05-03-2024', status: 'Processing' },
  { id: 8, customerName: 'Sonia', orderDate: '01-03-2024', status: 'Delivered' },
];

const OrdersManagement = ({ onOrderCountChange }) => {
  // State variables
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState('');
  const [statusOptions] = useState(['Pending', 'Processing', 'Delivered', 'Cancelled']);

  // Function to calculate the total number of orders
  const calculateOrderCount = () => {
    return orders.length;
  };

  // Function to handle viewing order details
  const handleViewDetails = (orderId) => {
    setSelectedOrderId(orderId);
    setEditMode(false);
  };

  // Function to handle updating order status
  const handleUpdateStatus = () => {
    if (selectedOrderId && updatedStatus) {
      const updatedOrders = orders.map(order =>
        order.id === selectedOrderId ? { ...order, status: updatedStatus } : order
      );
      setOrders(updatedOrders);
      setEditMode(false);
    }
  };

  // Function to handle deleting an order
  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    setSelectedOrderId(null);
    onOrderCountChange(calculateOrderCount()); // Notify parent component of updated order count
  };

  // Function to handle changing status in edit mode
  const handleStatusChange = (e) => {
    setUpdatedStatus(e.target.value);
  };

  // Effect to update order count whenever orders change
  useEffect(() => {
    onOrderCountChange(calculateOrderCount());
  });

  return (
    <div className="orders-container">
      <h1>Orders Management</h1>
      <div className="order-list">
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <span>Order ID: {order.id}</span>
              <span>Customer: {order.customerName}</span>
              <span>Date: {order.orderDate}</span>
              <span>Status: {order.status}</span>
              <button onClick={() => handleViewDetails(order.id)}>View Details</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedOrderId !== null && (
        <div className="order-details">
          <h3>Order Details</h3>
          {editMode ? (
            <>
              <p><strong>Order ID:</strong> {selectedOrderId}</p>
              <p><strong>Customer:</strong> {orders.find(order => order.id === selectedOrderId).customerName}</p>
              <p><strong>Date:</strong> {orders.find(order => order.id === selectedOrderId).orderDate}</p>
              <p><strong>Status:</strong> 
                <select value={updatedStatus} onChange={handleStatusChange}>
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </p>
              <button onClick={handleUpdateStatus}>Update</button>
            </>
          ) : (
            <>
              <p><strong>Order ID:</strong> {selectedOrderId}</p>
              <p><strong>Customer:</strong> {orders.find(order => order.id === selectedOrderId).customerName}</p>
              <p><strong>Date:</strong> {orders.find(order => order.id === selectedOrderId).orderDate}</p>
              <p><strong>Status:</strong> {orders.find(order => order.id === selectedOrderId).status}</p>
              <button onClick={() => setEditMode(true)}>Edit Status</button>
            </>
          )}
          <button onClick={() => handleDeleteOrder(selectedOrderId)}>Delete Order</button>
          <button onClick={() => setSelectedOrderId(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default OrdersManagement;
