// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Create this CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-logo">
          <img src="/logo.png" alt="SupportBuy Logo" className="footer-logo-image" />
          <span className="footer-logo-text">SupportBuy</span>
        </div>
        <div className="footer-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/shops">Shops</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </div>
        <div className="footer-info">
          <p>&copy; {new Date().getFullYear()} SupportBuy. All rights reserved.</p>
          <p>Made with ❤️ in Cape Town.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
