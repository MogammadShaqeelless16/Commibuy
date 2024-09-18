import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient'; // Adjust the path as needed
import './BusinessManagementPage.css';

function BusinessManagementPage() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    async function fetchBusinesses() {
      const { data: businessesData, error } = await supabase
        .from('businesses') // Replace with your table name
        .select('*');

      if (error) {
        console.error('Error fetching businesses:', error);
      } else {
        setBusinesses(businessesData);
      }
    }

    fetchBusinesses();
  }, []);

  return (
    <div className="business-management-page">
      <h1>Business Management</h1>
      <div className="business-list">
        {businesses.length ? (
          businesses.map(business => (
            <div key={business.id} className="business-card">
              <h2>{business.name}</h2>
              <p>{business.description}</p>
              <p>{business.address}</p>
            </div>
          ))
        ) : (
          <p>No businesses found.</p>
        )}
      </div>
    </div>
  );
}

export default BusinessManagementPage;
