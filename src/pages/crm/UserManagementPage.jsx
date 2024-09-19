import React, { useState, useEffect } from 'react';
import { fetchUsersWithRoles, addUser, updateUser } from '../../supabase/userOperations'; // Adjust path as needed
import { fetchBusinesses } from '../../supabase/businessOperations'; // Adjust path as needed
import './UserManagementPage.css';

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [userBusinessMapping, setUserBusinessMapping] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', email: '', role_id: '', businessIds: [] });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const usersData = await fetchUsersWithRoles();
        if (usersData) {
          setUsers(usersData);

          // Prepare user-business mapping (with business names)
          const mapping = {};
          usersData.forEach(user => {
            if (user.users_businesses) {
              mapping[user.id] = user.users_businesses.map(ub => ub.businesses?.name || 'Unknown Business'); // Handle null names
            } else {
              mapping[user.id] = [];
            }
          });
          setUserBusinessMapping(mapping);
        }

        // Fetch businesses
        const businessesData = await fetchBusinesses();
        if (businessesData) {
          setBusinesses(businessesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }

    loadData();
  }, []);

  const handleAddUser = async () => {
    const { username, email, role_id, businessIds } = newUser;
    try {
      const newUserData = await addUser({ username, email, role_id, businessIds });
      if (newUserData) {
        setNewUser({ username: '', email: '', role_id: '', businessIds: [] });
        setShowModal(false);
        // Refresh users data after adding a new user
        const updatedUsers = await fetchUsersWithRoles();
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Error adding user:', error.message);
    }
  };

  const handleEditUser = async () => {
    const { id, username, email, role_id, businessIds } = selectedUser;
    try {
      const updatedUserData = await updateUser({ id, username, email, role_id, businessIds });
      if (updatedUserData) {
        setSelectedUser(null);
        setShowModal(false);
        // Refresh users data after updating a user
        const updatedUsers = await fetchUsersWithRoles();
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  const getBusinessNames = (businessNames) => {
    if (!Array.isArray(businessNames)) return 'No Business';
    return businessNames.join(', '); // Join business names by a comma
  };

  const handleUserClick = (user) => {
    if (user) {
      setSelectedUser({
        ...user,
        businessIds: user.users_businesses ? user.users_businesses.map(ub => ub.business_id) : []
      });
      setShowModal(true);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-management-page">
      <h1>User Management</h1>
      <div className="header">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        <button onClick={() => setShowModal(true)} className="add-user-button">
          Add User
        </button>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Businesses</th>
            <th>Last Login</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length ? (
            filteredUsers.map(user => {
              const businessNames = getBusinessNames(userBusinessMapping[user.id] || []);
              const lastLoginDate = user.last_login ? new Date(user.last_login) : new Date();
              const isLongTime = new Date() - lastLoginDate > 30 * 24 * 60 * 60 * 1000; // Check if last login was more than a month ago
              return (
                <tr key={user.id} onClick={() => handleUserClick(user)}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.roles ? user.roles.role_name : 'No Role'}</td>
                  <td>{businessNames}</td>
                  <td className={isLongTime ? 'long-time' : ''}>
                    {lastLoginDate.toLocaleString()}
                  </td>
                  <td>
                    <button
                      className="action-button edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUserClick(user);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for Editing User */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedUser ? 'Edit User' : 'Add User'}</h2>
            <form>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  id="username"
                  type="text"
                  value={selectedUser ? selectedUser.username : newUser.username}
                  onChange={(e) => {
                    const value = e.target.value;
                    selectedUser
                      ? setSelectedUser({ ...selectedUser, username: value })
                      : setNewUser({ ...newUser, username: value });
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  value={selectedUser ? selectedUser.email : newUser.email}
                  onChange={(e) => {
                    const value = e.target.value;
                    selectedUser
                      ? setSelectedUser({ ...selectedUser, email: value })
                      : setNewUser({ ...newUser, email: value });
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="role_id">Role:</label>
                <select
                  id="role_id"
                  value={selectedUser ? selectedUser.role_id : newUser.role_id}
                  onChange={(e) => {
                    const value = e.target.value;
                    selectedUser
                      ? setSelectedUser({ ...selectedUser, role_id: value })
                      : setNewUser({ ...newUser, role_id: value });
                  }}
                >
                  {/* Populate this with role options */}
                  {/* Example:
                    roles.map(role => (
                      <option key={role.id} value={role.id}>
                        {role.role_name}
                      </option>
                    ))
                  */}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="businesses">Businesses:</label>
                <select
                  id="businesses"
                  multiple
                  value={selectedUser ? selectedUser.businessIds : newUser.businessIds}
                  onChange={(e) => {
                    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                    selectedUser
                      ? setSelectedUser({ ...selectedUser, businessIds: selectedOptions })
                      : setNewUser({ ...newUser, businessIds: selectedOptions });
                  }}
                >
                  {businesses.map(business => (
                    <option key={business.id} value={business.id}>
                      {business.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="cancel-button">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={selectedUser ? handleEditUser : handleAddUser}
                  className="submit-button"
                >
                  {selectedUser ? 'Save Changes' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagementPage;
