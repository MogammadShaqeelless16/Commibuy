import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/commibuy.png';
import './Menu.css';

function Menu() {
  return (
    <nav className="menu">
      <div className="menu-container">
        <div className="menu-logo">
          <img src={logo} alt="Commiploy Logo" className="logo-image" />
          <span className="company-name">Commi</span>
          <span className="ploy">ploy</span>
        </div>
        <div className="menu-links">
          <Link to="/">Home</Link>
          <span className="divider">|</span>
          <Link to="/features">Features</Link>
          <span className="divider">|</span>
          <Link to="/about">About</Link>
          <span className="divider">|</span>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="auth-links">
          <Link to="/login" className="login-link">Login</Link>
          <Link to="/signup" className="signup-button">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
