import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient'; // Adjust the path as needed
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
      const { data: profileData, error } = await supabase
        .from('profiles') // Replace with your table name
        .select('*')
        .eq('id', supabase.auth.user().id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(profileData);
        setFormData({
          name: profileData.name,
          email: profileData.email
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
    const { error } = await supabase
      .from('profiles') // Replace with your table name
      .update(formData)
      .eq('id', supabase.auth.user().id);

    if (error) {
      console.error('Error updating profile:', error);
    } else {
      setProfile(formData);
      setIsEditing(false);
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
