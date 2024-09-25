import React from 'react';

function UserTable({ users, searchQuery, setSearchQuery, handleUserClick }) {
  const getBusinessNames = (businessNames) => {
    return Array.isArray(businessNames) ? businessNames.join(', ') : 'No Business';
  };

  return (
    <div>
      <div className="header">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
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
          {users.length ? (
            users.map(user => {
              const businessNames = getBusinessNames(user.users_businesses?.map(ub => ub.businesses?.name));
              const lastLoginDate = user.last_login ? new Date(user.last_login) : new Date();
              const isLongTime = new Date() - lastLoginDate > 30 * 24 * 60 * 60 * 1000;
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
    </div>
  );
}

export default UserTable;
