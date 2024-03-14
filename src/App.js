// In App.js or wherever you render these components

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard'
import ProductsManagement from './Components/ProductsManagement';
import OrdersManagement from './Components/OrdersManagement';
import OrdersCalendarView from './Components/OrdersCalendarView';

function App() {
  const [productCount, setProductCount] = useState(10);
  const [orderCount, setOrderCount] = useState(8);

  const handleProductCountChange = (count) => {
    setProductCount(count);
  };

  const handleOrderCountChange = (count) => {
    setOrderCount(count);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Dashboard totalProductCount={productCount} totalOrderCount={orderCount} />}
        />
        <Route
          path="/products"
          element={<ProductsManagement onProductCountChange={handleProductCountChange} />}
        />
        <Route
          path="/orders"
          element={<OrdersManagement onOrderCountChange={handleOrderCountChange} />}
        />
        <Route path="/calendar" element={<OrdersCalendarView />} />
      </Routes>
    </Router>
  );
}

export default App;
