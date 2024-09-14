// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="crm-sidebar">
      <h2>CRM Menu</h2>
      <ul>
        <li><Link to="/crm/dashboard">Dashboard</Link></li>
        <li><Link to="/crm/customers">Customers</Link></li>
        <li><Link to="/crm/orders">Orders</Link></li>
        <li><Link to="/crm/products">Products</Link></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
