import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import ProductsManagement from './Components/ProductsManagement';
import OrdersManagement from './Components/OrdersManagement';
import OrdersCalendarView from './Components/OrdersCalendarView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<ProductsManagement />} />
        <Route path="/orders" element={<OrdersManagement />} />
        <Route path="/calendar" element={<OrdersCalendarView />} />
      </Routes>
    </Router>
  );
}

export default App;

