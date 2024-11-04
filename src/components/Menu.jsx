// components/Menu.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/commibuy.png';
import './Menu.css';

function Menu() {
  const [isOpen, setIsOpen] = useState(false); // State to manage menu visibility

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="menu">
      <div className="menu-container">
        <div className="menu-logo">
          <img src={logo} alt="Commibuy Logo" className="logo-image" />
          <span className="company-name">Commi</span>
          <span className="ploy">ploy</span>
        </div>
        <div className={`menu-links ${isOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
        <div className="auth-links">
          <Link to="/login" className="login-link">Login</Link>
          <Link to="/signup" className="signup-button">Sign Up</Link>
        </div>
        <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
