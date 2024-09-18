import React, { useState, useEffect } from 'react';
import { fetchUsersWithRoles, addUser, updateUser } from '../../supabase/userOperations'; // Adjust the path as needed
import { fetchBusinesses } from '../../supabase/businessOperations'; // Adjust the path as needed
import './UserManagementPage.css';

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [userBusinessMapping, setUserBusinessMapping] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', email: '', role_id: '', businessIds: [] });

  useEffect(() => {
    async function loadData() {
      try {
        // Fetch users with roles and businesses
        const usersData = await fetchUsersWithRoles();
        if (usersData) {
          setUsers(usersData);
  
          // Prepare user-business mapping (with business names)
          const mapping = {};
          usersData.forEach(user => {
            if (user.users_businesses && user.users_businesses.length > 0) {
              mapping[user.id] = user.users_businesses.map(ub => ub.businesses.name); // Access the business name directly
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
        console.error('Error fetching data:', error);
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
      console.error('Error adding user:', error);
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
      console.error('Error updating user:', error);
    }
  };

  const getBusinessNames = (businessNames) => {
    if (!businessNames || !Array.isArray(businessNames)) return 'No Business';
    return businessNames.join(', '); // Join business names by a comma
  };

  const handleUserClick = (user) => {
    if (user) {
      setSelectedUser({
        ...user,
        businessIds: userBusinessMapping[user.id] || []
      });
      setShowModal(true);
    }
  };

  return (
    <div className="user-management-page">
      <h1>User Management</h1>
      <div className="header">
        <button onClick={() => setShowModal(true)} className="add-user-button">
          Add User
        </button>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Businesses</th>
            <th>Actions</th>
          </tr>
        </thead>
          <tbody>
            {users.length ? (
              users.map((user) => {
                const businessNames = getBusinessNames(userBusinessMapping[user.id]); // Directly pass the business names
                return (
                  <tr key={user.id} onClick={() => handleUserClick(user)}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{businessNames || 'No Business'}</td>
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
                <td colSpan="4">No users found.</td>
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
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="businesses">Businesses:</label>
                <select
                  id="businesses"
                  multiple
                  value={selectedUser ? selectedUser.businessIds : newUser.businessIds}
                  onChange={(e) => {
                    const options = e.target.options;
                    const selectedValues = [];
                    for (let i = 0; i < options.length; i++) {
                      if (options[i].selected) selectedValues.push(options[i].value);
                    }
                    selectedUser
                      ? setSelectedUser({ ...selectedUser, businessIds: selectedValues })
                      : setNewUser({ ...newUser, businessIds: selectedValues });
                  }}
                >
                  {businesses.map((business) => (
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
