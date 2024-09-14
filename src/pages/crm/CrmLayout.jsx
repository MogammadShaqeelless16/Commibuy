import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom'; // Import Outlet
import { FaTachometerAlt, FaUsers, FaBoxOpen, FaClipboardList, FaSignOutAlt, FaUserTie } from 'react-icons/fa';
import './CrmLayout.css';

function CrmLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session (if any)
    // Redirect to the home page
    navigate('/');
  };

  return (
    <div className="crm-layout">
      <aside className="crm-sidebar">
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
            <button onClick={handleLogout} className="logout-button">
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </aside>

      <section className="crm-content">
        <Outlet /> {/* This will render the selected CRM route */}
      </section>
    </div>
  );
}

export default CrmLayout;
