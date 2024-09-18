import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient'; // Adjust the path as needed
import './UserManagementPage.css';

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [userBusinessMapping, setUserBusinessMapping] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', email: '', businessIds: [] });

  useEffect(() => {
    async function fetchUsers() {
      const { data: usersData, error } = await supabase
        .from('users') // Replace with your table name
        .select('*');
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(usersData);
        console.log('Users fetched:', usersData);
      }
    }

    async function fetchBusinesses() {
      const { data: businessesData, error } = await supabase
        .from('businesses') // Replace with your table name
        .select('*');
      if (error) {
        console.error('Error fetching businesses:', error);
      } else {
        setBusinesses(businessesData);
        console.log('Businesses fetched:', businessesData);
      }
    }

    async function fetchUserBusinessMapping() {
      const { data: userBusinessesData, error } = await supabase
        .from('users_businesses') // Replace with your table name
        .select('user_id, business_id');

      if (error) {
        console.error('Error fetching user-business mapping:', error);
      } else {
        console.log('User-business data:', userBusinessesData); // Log the raw data
        
        const mapping = {};
        userBusinessesData.forEach(({ user_id, business_id }) => {
          if (!mapping[user_id]) mapping[user_id] = [];
          mapping[user_id].push(business_id);
        });
        
        console.log('User-business mapping:', mapping); // Log the processed mapping
        setUserBusinessMapping(mapping);
      }
    }

    fetchUsers();
    fetchBusinesses();
    fetchUserBusinessMapping();
  }, []);

  const handleAddUser = async () => {
    const { username, email, businessIds } = newUser;
    const { data: newUserData, error } = await supabase
      .from('users')
      .insert([{ username, email }]);

    if (error) {
      console.error('Error adding user:', error);
    } else {
      const userId = newUserData[0].id;
      const businessEntries = businessIds.map(businessId => ({
        user_id: userId,
        business_id: businessId
      }));
      await supabase
        .from('user_businesses')
        .insert(businessEntries);
      
      setNewUser({ username: '', email: '', businessIds: [] });
      setShowModal(false);
      console.log('User added:', newUserData);
    }
  };

  const handleEditUser = async () => {
    const { id, username, email, businessIds } = selectedUser;
    const { error } = await supabase
      .from('users')
      .update({ username, email })
      .match({ id });

    if (error) {
      console.error('Error updating user:', error);
    } else {
      await supabase
        .from('users_businesses')
        .delete()
        .match({ user_id: id });
      
      const businessEntries = businessIds.map(businessId => ({
        user_id: id,
        business_id: businessId
      }));
      await supabase
        .from('users_businesses')
        .insert(businessEntries);
      
      setSelectedUser(null);
      setShowModal(false);
      console.log('User updated:', selectedUser);
    }
  };

  const getBusinessNames = (businessIds) => {
    console.log('Fetching business names for IDs:', businessIds);
    if (!Array.isArray(businessIds) || businessIds.length === 0) {
      console.log('No business IDs provided.');
      return 'No Business';
    }
    
    // Create a map for quick lookup
    const businessMap = businesses.reduce((map, business) => {
      map[business.id] = business.name;
      return map;
    }, {});
    
    const names = businessIds.map(id => businessMap[id] || 'Unknown Business');
    console.log('Business names:', names);
    return names.length ? names.join(', ') : 'No Business';
  };

  const handleUserClick = (user) => {
    console.log('User clicked:', user);
    console.log('Current user-business mapping:', userBusinessMapping);
    
    const businessIds = userBusinessMapping[user.id] || [];
    console.log('Business IDs for user:', businessIds);

    setSelectedUser({ ...user, businessIds });
    setShowModal(true);
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
              const userBusinessIds = userBusinessMapping[user.id] || [];
              const businessNames = getBusinessNames(userBusinessIds);
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
                <label htmlFor="businesses">Businesses:</label>
                <select
                  id="businesses"
                  multiple
                  value={selectedUser ? selectedUser.businessIds : newUser.businessIds}
                  onChange={(e) => {
                    const options = e.target.options;
                    const selectedValues = [];
                    for (let i = 0; i < options.length; i++) {
                      if (options[i].selected) selectedValues.push(Number(options[i].value));
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
