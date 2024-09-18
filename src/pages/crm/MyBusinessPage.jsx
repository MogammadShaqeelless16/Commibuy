import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient'; // Adjust the path as needed
import './MyBusinessPage.css';

function MyBusinessPage() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    async function fetchBusinesses() {
      const { data: businessesData, error } = await supabase
        .from('businesses') // Replace with your table name
        .select('*')
        .eq('user_id', supabase.auth.user().id); // Adjust the query based on your schema

      if (error) {
        console.error('Error fetching businesses:', error);
      } else {
        setBusinesses(businessesData);
      }
    }

    fetchBusinesses();
  }, []);

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
            </div>
          ))
        ) : (
          <p>No businesses found.</p>
        )}
      </div>
    </div>
  );
}

export default MyBusinessPage;
