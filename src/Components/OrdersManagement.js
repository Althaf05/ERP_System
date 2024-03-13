import React, { useState } from 'react';
import './OrdersManagement.css';

const initialOrders = [
  { id: 1, customerName: 'Abhiram', orderDate: '11-03-2024', status: 'Delivered' },
  { id: 2, customerName: 'Ajay', orderDate: '10-03-2024', status: 'Pending' },
  { id: 3, customerName: 'Sai teja', orderDate: '09-03-2024', status: 'Processing' }
];

const OrdersManagement = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState('');

  const [statusOptions] = useState(['Pending', 'Processing', 'Delivered', 'Cancelled']);

  const handleViewDetails = (orderId) => {
    setSelectedOrderId(orderId);
    setEditMode(false);
  };

  const handleUpdateStatus = () => {
    if (selectedOrderId && updatedStatus) {
      const updatedOrders = orders.map(order =>
        order.id === selectedOrderId ? { ...order, status: updatedStatus } : order
      );
      setOrders(updatedOrders);
      setEditMode(false);
    }
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    setSelectedOrderId(null);
  };

  const handleStatusChange = (e) => {
    setUpdatedStatus(e.target.value);
  };

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
