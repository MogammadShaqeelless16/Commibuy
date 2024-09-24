
// MyBusinessPage/BusinessCard.js
import React from 'react';
import { FaPen } from 'react-icons/fa';

function BusinessCard({ business, onEdit }) {
  return (
    <div className="business-card">
      <h2>{business.name}</h2>
      <p>{business.address}</p>
      <button className="edit-btn" onClick={() => onEdit(business)}>
        <FaPen /> Edit
      </button>
    </div>
  );
}

export default BusinessCard;








