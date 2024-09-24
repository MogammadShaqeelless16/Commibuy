// MyBusinessPage/Notification.js
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

function Notification({ notification, onVisitWebsite, onClose }) {
  return (
    <div className="notification-overlay">
      <div className="notification-content">
        <p>{notification.message}</p>
        <button className="visit-btn" onClick={onVisitWebsite}>
          Visit Website <FaExternalLinkAlt />
        </button>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Notification;