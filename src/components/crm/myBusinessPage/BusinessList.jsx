
// MyBusinessPage/BusinessList.js
import React from 'react';
import BusinessCard from './BusinessCard';

function BusinessList({ businesses, onEdit }) {
  return (
    <div className="business-list">
      {businesses.length ? (
        businesses.map(business => (
          <BusinessCard key={business.id} business={business} onEdit={onEdit} />
        ))
      ) : (
        <p>No businesses found.</p>
      )}
    </div>
  );
}

export default BusinessList;




