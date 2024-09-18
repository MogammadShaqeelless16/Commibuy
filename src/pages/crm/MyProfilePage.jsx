import React, { useState, useEffect } from 'react';
import { fetchCurrentUser, updateUserProfile } from '../../supabase/userOperations'; // Adjust the path as needed
import './MyProfilePage.css';

function MyProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    async function fetchProfile() {
      const userProfile = await fetchCurrentUser(); // Use the helper function
      if (userProfile) {
        setProfile(userProfile);
        setFormData({
          name: userProfile.name,
          email: userProfile.email
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
        setProfile(formData); // Update the profile state with the new data
        setIsEditing(false); // Exit editing mode
      } else {
        console.error('Error updating profile');
      }
    }
  };

  return (
    <div className="my-profile-page">
      <h1>My Profile</h1>
      {isEditing ? (
        <div>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Name: {profile?.name}</p>
          <p>Email: {profile?.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default MyProfilePage;
