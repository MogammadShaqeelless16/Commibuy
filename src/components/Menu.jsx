// src/components/Menu.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaSignInAlt, FaUserPlus, FaShoppingCart } from 'react-icons/fa';
import './Menu.css'; // Make sure to create this CSS file

function Menu() {
  return (
    <nav className="menu">
      <div className="container">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="SupportBuy Logo" className="logo-image" />
          <span className="logo-text">SupportBuy</span>
        </Link>
        <ul className="menu-items">
          <li><Link to="/"><FaHome /> Home</Link></li>
          <li><Link to="/about"><FaInfoCircle /> About</Link></li>
          <li><Link to="/shops"><FaShoppingCart /> Shops</Link></li>
          <li><Link to="/login"><FaSignInAlt /> Login</Link></li>
          <li><Link to="/signup"><FaUserPlus /> Sign Up</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Menu;