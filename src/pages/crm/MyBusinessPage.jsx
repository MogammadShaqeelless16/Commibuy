import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient'; // Adjust the path as needed
import { fetchCurrentUser } from '../../supabase/userOperations'; // Adjust the path as needed
import './MyBusinessPage.css';
import { FaPen, FaSave, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function MyBusinessPage() {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        const userProfile = await fetchCurrentUser(); // Get the current user profile
        if (userProfile) {
          // Fetch businesses associated with the current user
          const { data: userBusinesses, error: userBusinessesError } = await supabase
            .from('users_businesses') // Your join table
            .select('business_id')
            .eq('user_id', userProfile.id);

          if (userBusinessesError) {
            console.error('Error fetching user businesses:', userBusinessesError);
            return;
          }

          // Extract business IDs
          const businessIds = userBusinesses.map(ub => ub.business_id);

          // Fetch details for the businesses
          const { data: businessesData, error: businessesError } = await supabase
            .from('businesses') // Replace with your table name
            .select('*')
            .in('id', businessIds);

          if (businessesError) {
            console.error('Error fetching businesses:', businessesError);
          } else {
            setBusinesses(businessesData);
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }

    fetchBusinesses();
  }, []);

  const handleEdit = (business) => {
    setSelectedBusiness(business);
    setEditForm({ ...business });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const { id, slug, ...updates } = editForm;
      const { error } = await supabase
        .from('businesses')
        .upsert({ id, slug, ...updates });

      if (error) {
        console.error('Error saving business:', error);
      } else {
        setNotification({ message: 'Save successfully!', businessSlug: slug });
        setIsEditing(false);
        setSelectedBusiness(null);
        setEditForm({});
        // Refresh the list of businesses
        fetchBusinesses();
      }
    } catch (error) {
      console.error('Error saving business:', error);
    }
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const handleVisitWebsite = () => {
    if (notification) {
      window.open(`/business/${notification.businessSlug}`, '_blank');
    }
  };

  return (
    <div className="my-business-page">
      <h1>My Businesses</h1>
      <div className="business-list">
        {businesses.length ? (
          businesses.map(business => (
            <div key={business.id} className="business-card">
              <h2>{business.name}</h2>
              <p>{business.description}</p>
              <p>{business.address}</p>
              <button className="edit-btn" onClick={() => handleEdit(business)}>
                <FaPen /> Edit
              </button>
            </div>
          ))
        ) : (
          <p>No businesses found.</p>
        )}
      </div>

      {isEditing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Business</h2>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editForm.name || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={editForm.description || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={editForm.address || ''}
                onChange={handleChange}
              />
            </label>
            <div className="modal-buttons">
              <button className="save-btn" onClick={handleSave}>
                <FaSave /> Save
              </button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                <FaTimes /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {notification && (
        <div className="notification-overlay">
          <div className="notification-content">
            <p>{notification.message}</p>
            <button className="visit-btn" onClick={handleVisitWebsite}>
              Visit Website <FaExternalLinkAlt />
            </button>
            <button className="close-btn" onClick={handleCloseNotification}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBusinessPage;
