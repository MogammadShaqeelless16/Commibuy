import React from 'react';

function UserModal({ selectedUser, setSelectedUser, newUser, setNewUser, handleAddUser, handleEditUser, setShowModal, businesses, roles }) {
  return (
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
              <option value="">Select Role</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.role_name}
                </option>
              ))}
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
  );
}

export default UserModal;
