import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient'; // Adjust the path as needed
import './UserManagementPage.css';

function UserManagementPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data: usersData, error } = await supabase
        .from('users') // Replace with your table name
        .select('*');

      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(usersData);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div className="user-management-page">
      <h1>User Management</h1>
      <div className="user-list">
        {users.length ? (
          users.map(user => (
            <div key={user.id} className="user-card">
              <h2>{user.username}</h2>
              <p>{user.email}</p>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}

export default UserManagementPage;
