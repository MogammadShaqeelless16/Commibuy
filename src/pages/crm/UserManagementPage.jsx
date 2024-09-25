import React, { useState, useEffect } from 'react';
import { fetchUsersWithRoles, addUser, updateUser } from '../../supabase/userOperations'; // Adjust path as needed
import { fetchBusinesses } from '../../supabase/businessOperations'; // Adjust path as needed
import { fetchRoles } from '../../supabase/roleOperations'; // Adjust path as needed
import UserTable from '../../components/crm/usermanagement/UserTable';
import UserModal from '../../components/crm/usermanagement/UserModal';
import './UserManagementPage.css';

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [roles, setRoles] = useState([]); // State for roles
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

          // Prepare user-business mapping
          const mapping = {};
          usersData.forEach(user => {
            mapping[user.id] = user.users_businesses ? 
              user.users_businesses.map(ub => ub.businesses?.name || 'Unknown Business') : [];
          });
          setUserBusinessMapping(mapping);
        }

        // Fetch businesses
        const businessesData = await fetchBusinesses();
        if (businessesData) {
          setBusinesses(businessesData);
        }

        // Fetch roles
        const rolesData = await fetchRoles();
        if (rolesData) {
          setRoles(rolesData);
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
        const updatedUsers = await fetchUsersWithRoles();
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
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

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-management-page">
      <h1>User Management</h1>
      <UserTable 
        users={filteredUsers} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery} 
        handleUserClick={handleUserClick} 
      />
      
      <button onClick={() => setShowModal(true)} className="add-user-button">
        Add User
      </button>
      
      {showModal && (
        <UserModal
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          newUser={newUser}
          setNewUser={setNewUser}
          handleAddUser={handleAddUser}
          handleEditUser={handleEditUser}
          setShowModal={setShowModal}
          businesses={businesses}
          roles={roles} // Pass roles to UserModal
        />
      )}
    </div>
  );
}

export default UserManagementPage;
