// src/components/Logo.jsx

import React from 'react';
import logo from '../assets/commibuy.png'; // Adjust the path based on your folder structure
import './Logo.css'; // Ensure you create this CSS file for styling

function Logo() {
  return (
    <div className="logo">
      <img src={logo} alt="SupportBuy Logo" className="logo-image" />
    </div>
  );
}

export default Logo;