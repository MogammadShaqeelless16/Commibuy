import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { 
  FaTachometerAlt, FaUsers, FaBoxOpen, FaClipboardList, 
  FaSignOutAlt, FaUserTie, FaUser, FaBusinessTime, FaServicestack 
} from 'react-icons/fa';
import './CrmLayout.css';
import { fetchCurrentUserRole } from '../../supabase/userOperations'; // Adjust the path

function CrmLayout() {
  const navigate = useNavigate();
  const [showAdminMenu, setShowAdminMenu] = useState(false);
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

  const toggleAdminMenu = () => {
    setShowAdminMenu(prevState => !prevState);
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
          <li>
            <Link to="/crm/my-profile">
              <FaUser /> My Profile
            </Link>
          </li>
          {(userRole === 'Admin' || userRole === 'Developer') && (
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
          )}
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
