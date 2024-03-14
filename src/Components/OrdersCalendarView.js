

import React, { useState } from 'react';
import './OrdersCalendarView.css';

const initialOrders = [
  { id: 1, customerName: 'Ajay', deliveryDate: '2024-03-12', status: 'Pending' },
  { id: 2, customerName: 'Abhiram', deliveryDate: '2024-03-10', status: 'Delivered' },
  { id: 3, customerName: 'Rohan', deliveryDate: '2024-03-09', status: 'Processing' },
  { id: 4, customerName: 'Rithwik', deliveryDate: '2024-03-12', status: 'Pending' },
  { id: 5, customerName: 'Uday', deliveryDate: '2024-03-12', status: 'Processing' },
  { id: 6, customerName: 'Althaf', deliveryDate: '2024-03-11', status: 'Delivered' },
  { id: 7, customerName: 'Mahammad', deliveryDate: '2024-03-09', status: 'Processing' },
  { id: 8, customerName: 'Sonia', deliveryDate: '2024-03-11', status: 'Delivered' },
];

const OrdersCalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ordersForSelectedDate, setOrdersForSelectedDate] = useState([]);

  const orders = initialOrders;

  const handleDateClick = (date) => {
    const formattedDate = formatDate(new Date(date));
    const ordersForDate = orders.filter(order => formatDate(new Date(order.deliveryDate)) === formattedDate);
    setOrdersForSelectedDate(ordersForDate);
    setSelectedDate(new Date(date)); 
  };

  // Function to format date
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Function to get the status class for a given date
  const getStatusClass = (date) => {
    const formattedDate = formatDate(new Date(date));
    const ordersForDate = orders.filter(order => formatDate(new Date(order.deliveryDate)) === formattedDate);
    const hasProcessingOrders = ordersForDate.some(order => order.status === 'Processing');
    const hasPendingOrders = ordersForDate.some(order => order.status === 'Pending');
    if (hasProcessingOrders) {
      return 'processing';
    } else if (hasPendingOrders) {
      return 'pending';
    } else {
      return '';
    }
  };

  // Function to generate calendar data
  const getCalendarData = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();

    let date = 1;
    const calendarData = [];

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfWeek) {
          week.push('');
        } else if (date > daysInMonth) {
          break;
        } else {
          week.push(new Date(year, month, date));
          date++;
        }
      }
      calendarData.push(week);
      if (date > daysInMonth) break;
    }

    return calendarData;
  };


   // Function to handle month change
  const handleMonthChange = (change) => {
    setSelectedDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + change);
      return newDate;
    });
  };

  // Function to handle year change
  const handleYearChange = (change) => {
    setSelectedDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(newDate.getFullYear() + change);
      return newDate;
    });
  };

  const calendarData = getCalendarData();

  return (
    <div className="calendar">
      <h1>Orders Calendar View</h1>
      <div className="legend">
        <p><span className="note">* Note:</span> Marked dates indicate orders with status<br/> either "Processing" or "Pending".</p>
      </div>
      <div className="calendar-controls">
        <button onClick={() => handleYearChange(-1)}>Previous Year</button>
        <button onClick={() => handleMonthChange(-1)}>Previous Month</button>
        <span>{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <button onClick={() => handleMonthChange(1)}>Next Month</button>
        <button onClick={() => handleYearChange(1)}>Next Year</button>
      </div>
      <div className="calendar-grid">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="day">{day}</div>
        ))}
        {calendarData.map((week, index) => (
          <React.Fragment key={index}>
            {week.map((date, dayIndex) => (
              <div
                key={dayIndex}
                className={`date-box ${date === '' ? 'empty' : ''} ${getStatusClass(date)}`}
                onClick={() => handleDateClick(date)}
              >
                {date !== '' && <span className="date">{date.getDate()}</span>}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      {ordersForSelectedDate.length > 0 && (
        <div className="orders-for-date">
          <h3>Orders for {selectedDate.toLocaleDateString()}</h3>
          <ul>
            {ordersForSelectedDate.map(order => (
              <li key={order.id}>
                <strong>Order ID:</strong> {order.id}, <strong>Customer:</strong> {order.customerName}, <strong>Status:</strong> {order.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrdersCalendarView;
