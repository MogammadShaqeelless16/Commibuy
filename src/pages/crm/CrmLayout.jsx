import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { 
  FaTachometerAlt, FaUsers, FaBoxOpen, FaClipboardList, 
  FaSignOutAlt, FaUserTie, FaUser, FaBusinessTime, FaServicestack 
} from 'react-icons/fa';
import './CrmLayout.css';
import { fetchCurrentUserRole } from '../../supabase/userOperations'; // Adjust the path
import CrmTopnav from '../../components/CrmTopnav';

function CrmLayout() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    async function loadUserRole() {
      try {
        const role = await fetchCurrentUserRole();
        setUserRole(role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    }

    loadUserRole();
  }, []);

  const handleLogout = () => {
    // Clear session (if any)
    // Redirect to the home page
    navigate('/');
  };

  return (
    <div className="crm-layout">
      <CrmTopnav userRole={userRole} handleLogout={handleLogout} />
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
            <Link to="/crm/services">
              <FaServicestack /> Services
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
          {/* Removed Admin section from Sidebar */}
        </ul>
      </aside>

      <section className="crm-content">
        <Outlet /> {/* This will render the selected CRM route */}
      </section>
    </div>
  );
}

export default CrmLayout;
