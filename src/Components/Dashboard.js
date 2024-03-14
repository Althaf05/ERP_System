import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ totalProductCount, totalOrderCount }) => {
  
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Total Products: {totalProductCount}</p>
      <p>Total Orders: {totalOrderCount}</p>
      <p>Summary of key metrics or features</p>
      <ul>
        <li><Link to="/products">Products Management</Link></li>
        <li><Link to="/orders">Orders Management</Link></li>
        <li><Link to="/calendar">Orders Calendar</Link></li>
      </ul>
    </div>
  );
}

export default Dashboard;


