import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaClipboardList, FaSignOutAlt, FaUser, 
  FaChartBar, FaUserTie, FaBusinessTime, FaLockOpen
} from 'react-icons/fa';
import { fetchCurrentUser } from '../supabase/userOperations'; // Supabase operation to fetch user data
import './CrmTopnav.css';

function CrmTopnav({ userRole, handleLogout }) {
  const [showReportsDropdown, setShowReportsDropdown] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [user, setUser] = useState(null); // State to store user data
  const navigate = useNavigate();

  // Toggle the Reports dropdown
  const toggleReportsDropdown = () => {
    setShowReportsDropdown(prevState => !prevState);
  };

  // Toggle the Admin dropdown
  const toggleAdminDropdown = () => {
    setShowAdminDropdown(prevState => !prevState);
  };

  // Fetch user data from Supabase
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await fetchCurrentUser();
        setUser(currentUser); // Set the fetched user data in state
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <nav className="crm-topnav">
      <div className="nav-left">
        <Link to="/crm/reports" className="crm-logo">
          <h2>COMMIPLOY</h2>
        </Link>
      </div>

      <div className="nav-right">
        <ul className="nav-links">
          <li className="reports-dropdown">
            <button onClick={toggleReportsDropdown} className="dropdown-button">
              <FaChartBar /> Reports
            </button>
            {showReportsDropdown && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/crm/reports/sales-report">Sales Report</Link>
                </li>
                <li>
                  <Link to="/crm/reports/leads-report">Leads Report</Link>
                </li>
              </ul>
            )}
          </li>
          {/* Admin Links */}
          {(userRole === 'Admin' || userRole === 'Developer') && (
            <li className="admin-dropdown">
              <button onClick={toggleAdminDropdown} className="admin-button">
              <FaLockOpen />Admin
              </button>
              {showAdminDropdown && (
                <ul className="admin-menu">
                  <li>
                    <Link to="/crm/admin/user-management" className="admin-link">
                      <FaUserTie /> User Management
                    </Link>
                  </li>
                  <li>
                    <Link to="/crm/admin/business-management" className="admin-link">
                      <FaBusinessTime /> Business Management
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>

        <div className="profile-container" onClick={() => navigate('/crm/my-profile')}>
          {user ? (
            <>
              <img
                src={user.profile_picture || '/default-profile.png'} // Display user's profile picture or default one
                alt="Profile"
                className="profile-image"
              />
              <span className="profile-name">{user.name}</span> {/* Display user's name */}
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>

        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
}

export default CrmTopnav;
