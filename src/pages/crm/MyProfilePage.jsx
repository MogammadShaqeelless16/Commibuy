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
  const [imageSelected, setImageSelected] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showUpgradeDropdown, setShowUpgradeDropdown] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

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
      setImageSelected(true);
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
      setIsEditing(false);
    } else {
      alert('Error updating profile. Please try again.');
    }
  };

  const handleUpgradeRequest = () => {
    // Logic for handling the upgrade request, e.g., sending it to your backend
    console.log('Requested upgrade to:', selectedPlan);
    alert(`Requested upgrade to: ${selectedPlan}`);
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
              style={{ display: 'none' }}
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
              <p><strong>Role:</strong> {profile?.role_name}</p>
              <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
            </div>
          )}
        </div>
      </div>

      {/* Details Container */}
      <div className="profile-details-container">
        {/* Current Plan Block */}
        <div className="details-block">
          <h3>Current Plan</h3>
          <p><strong>Plan:</strong> {profile?.plan || 'Not specified'}</p>
          <button className="edit-button" onClick={() => setShowUpgradeDropdown(!showUpgradeDropdown)}>
            Request an Update
          </button>
          {showUpgradeDropdown && (
            <select onChange={(e) => setSelectedPlan(e.target.value)} value={selectedPlan}>
              <option value="" disabled>Select a plan</option>
              <option value="Basic">Basic</option>
              <option value="Pro">Pro</option>
              <option value="Premium">Premium</option>
            </select>
          )}
          {selectedPlan && (
            <button className="save-button" onClick={handleUpgradeRequest}>Confirm Upgrade</button>
          )}
        </div>

        {/* Settings Block */}
        <div className="details-block">
          <h3>Settings</h3>
          <p><strong>Permissions:</strong></p>
          <label>
            <input type="checkbox" checked={profile?.permissions?.can_edit} readOnly />
            Edit Profile
          </label>
          <label>
            <input type="checkbox" checked={profile?.permissions?.can_view_reports} readOnly />
            View Reports
          </label>
          <label>
            <input type="checkbox" checked={profile?.permissions?.can_manage_users} readOnly />
            Manage Users
          </label>
          <button className="edit-button">Edit Settings</button>
        </div>

        {/* Integrations Block */}
        <div className="details-block">
          <h3>Integrations</h3>
          <p><strong>Email Campaign:</strong> Active</p>
          <p><strong>Zapier:</strong> Connected</p>
          <p><strong>CRM Integration:</strong> Active</p>
          <button className="edit-button">Edit Integrations</button>
        </div>

        {/* Bank Details Block */}
        <div className="details-block">
          <h3>Bank Details</h3>
          <p><strong>Bank Name:</strong> {profile?.bank_details?.bank_name || 'Not provided'}</p>
          <p><strong>Account Number:</strong> {profile?.bank_details?.account_number || 'Not provided'}</p>
          <p><strong>IBAN:</strong> {profile?.bank_details?.iban || 'Not provided'}</p>
          <button className="edit-button">Edit Bank Details</button>
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
