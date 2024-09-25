import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBoxOpen, FaClipboardList, FaUser, FaBusinessTime } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="crm-sidebar">
      <h2>CRM Menu</h2>
      <ul className="crm-menu">
        <li>
          <Link to="/crm/dashboard">
            <FaTachometerAlt /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/crm/customers">
            <FaUsers /> Customers
          </Link>
        </li>
        <li>
          <Link to="/crm/orders">
            <FaClipboardList /> Orders
          </Link>
        </li>
        <li>
          <Link to="/crm/products">
            <FaBoxOpen /> Products
          </Link>
        </li>
        <li>
          <Link to="/crm/leads">
            <FaUserTie /> Leads
          </Link>
        </li>
        <li>
          <Link to="/crm/my-business">
            <FaBusinessTime /> My Business
          </Link>
        </li>
        <li>
          <Link to="/crm/my-profile">
            <FaUser /> My Profile
          </Link>
        </li>
        <li>
          <button className="logout-button">
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
