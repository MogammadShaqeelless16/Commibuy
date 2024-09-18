import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBoxOpen, FaClipboardList, FaSignOutAlt, FaUserTie, FaUser, FaBusinessTime } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const toggleAdminMenu = () => {
    setShowAdminMenu(prevState => !prevState);
  };

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
          <button onClick={toggleAdminMenu} className="dropdown-toggle">
            Admin
          </button>
          {showAdminMenu && (
            <ul className="admin-menu">
              <li><Link to="/crm/admin/user-management">User Management</Link></li>
              <li><Link to="/crm/admin/business-management">Business Management</Link></li>
            </ul>
          )}
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
