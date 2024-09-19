import React, { useState, useEffect } from 'react';
import { fetchCurrentUser, updateUserProfile } from '../../supabase/userOperations'; // Adjust the path as needed
import './MyProfilePage.css';

function MyProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    address: ''
  });

  useEffect(() => {
    async function fetchProfile() {
      const userProfile = await fetchCurrentUser(); // Use the helper function
      if (userProfile) {
        setProfile(userProfile);
        setFormData({
          name: userProfile.name,
          email: userProfile.email,
          bio: userProfile.bio || '',
          address: userProfile.address || ''
        });
      }
    }

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    if (profile && profile.id) {
      const success = await updateUserProfile(profile.id, formData); // Use the helper function
      if (success) {
        setProfile({ ...profile, ...formData }); // Update the profile state with the new data
        setIsEditing(false); // Exit editing mode
      } else {
        console.error('Error updating profile');
      }
    }
  };

  return (
    <div className="my-profile-page">
      <div className={`profile-container ${isEditing ? 'editing' : ''}`}>
        <div className="profile-picture">
          <img 
            src={profile?.profilePicture || 'https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg'} 
            alt="Profile" 
          />
        </div>
        <div className="profile-info">
          {isEditing ? (
            <div className="profile-edit-form">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Bio:
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </label>
              <div className="button-group">
                <button className="save-button" onClick={handleSave}>Save</button>
                <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="profile-details">
              <h2>{profile?.name}</h2>
              <p><strong>Email:</strong> {profile?.email}</p>
              <p><strong>Bio:</strong> {profile?.bio || 'No bio available'}</p>
              <p><strong>Address:</strong> {profile?.address || 'No address available'}</p>
              <p><strong>Role:</strong> {profile?.role}</p>
              <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfilePage;
