// MyBusinessPage/MyBusinessPage.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient';
import { fetchCurrentUser } from '../../supabase/userOperations';
import './MyBusinessPage.css';
import BusinessList from '../../components/crm/myBusinessPage/BusinessList';
import EditBusinessModal from '../../components/crm/myBusinessPage/EditBusinessModal';
import Notification from '../../components/crm/myBusinessPage/Notification';
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
        const userProfile = await fetchCurrentUser();
        if (userProfile) {
          const { data: userBusinesses, error: userBusinessesError } = await supabase
            .from('users_businesses')
            .select('business_id')
            .eq('user_id', userProfile.id);

          if (userBusinessesError) {
            console.error('Error fetching user businesses:', userBusinessesError);
            return;
          }

          const businessIds = userBusinesses.map(ub => ub.business_id);
          const { data: businessesData, error: businessesError } = await supabase
            .from('businesses')
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
      <BusinessList businesses={businesses} onEdit={handleEdit} />

      {isEditing && (
        <EditBusinessModal
          editForm={editForm}
          onChange={handleChange}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}

      {notification && (
        <Notification
          notification={notification}
          onVisitWebsite={handleVisitWebsite}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
}

export default MyBusinessPage;
