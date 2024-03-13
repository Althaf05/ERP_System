// components/Dashboard.js
import React from 'react';
import './Dashboard.css';
const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Summary of key metrics or features</p>
      <ul>
        <li><a href="/products">Products Management</a></li>
        <li><a href="/orders">Orders Management</a></li>
        <li><a href="/calendar">Orders Calender</a></li>
      </ul>
    </div>
  );
}

export default Dashboard;
