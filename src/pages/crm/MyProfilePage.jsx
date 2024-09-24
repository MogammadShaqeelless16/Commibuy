// MyProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { fetchCurrentUser, updateUserProfile, uploadProfilePicture } from '../../supabase/userOperations'; // Adjust the path as needed
import './MyProfilePage.css';

function MyProfilePage() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    address: ''
  });
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [imageSelected, setImageSelected] = useState(false); // Track if an image is selected
  const [isEditing, setIsEditing] = useState(false); // Track editing state

  useEffect(() => {
    async function fetchProfile() {
      const userProfile = await fetchCurrentUser();
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSelected(true); // Indicate that an image has been selected
      const publicURL = await uploadProfilePicture(file, profile.id);
      if (publicURL) {
        const updatedProfile = {
          ...formData,
          profile_picture: `https://hlrzkdxrzczxjmrsvmew.supabase.co/storage/v1/object/public/profile-pictures/${profile.id}.jpg`
        };

        const success = await updateUserProfile(profile.id, updatedProfile);
        if (success) {
          setProfile({ ...profile, ...updatedProfile });
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 5000);
        } else {
          alert('Error updating profile. Please try again.');
        }
      } else {
        alert('Failed to upload profile picture. Please try again.');
      }
    }
  };

  const handleSave = async () => {
    const success = await updateUserProfile(profile.id, formData);
    if (success) {
      setProfile({ ...profile, ...formData });
      setIsEditing(false); // Exit editing mode after saving
    } else {
      alert('Error updating profile. Please try again.');
    }
  };

  return (
    <div className="my-profile-page">
      <div className="profile-container">
        <div className="profile-picture">
          <label className="upload-label">
            <input
              type="file"
              id="profile-picture-input"
              accept=".jpg, .png"
              onChange={handleFileChange}
              style={{ display: 'none' }} // Hide the file input
            />
            <div className="image-preview">
              <img
                src={profile?.profile_picture || 'https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg'}
                alt="Profile"
              />
              {imageSelected ? (
                <span className="upload-text">Image selected</span>
              ) : (
                <span className="upload-text">Select an image</span>
              )}
            </div>
          </label>
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

      {/* Overlay for upload success message */}
      {uploadSuccess && (
        <div className="upload-success-overlay">
          Upload successful! Please allow a few minutes for the changes to reflect.
        </div>
      )}
    </div>
  );
}

export default MyProfilePage;
