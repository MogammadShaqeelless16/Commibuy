// src/components/Menu.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaSignInAlt, FaUserPlus, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import Logo from './Logo'; // Import the Logo component
import './Menu.css'; // Make sure to create this CSS file

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="menu">
      <div className="container">
        <Link to="/" className="logo">
          <Logo /> {/* Use the Logo component */}
        </Link>
        <button className="menu-toggle" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <ul className={`menu-items ${isOpen ? 'open' : ''}`}>
          <li><Link to="/"><FaHome /> Home</Link></li>
          <li><Link to="/about"><FaInfoCircle /> About</Link></li>
          <li><Link to="/shops"><FaShoppingCart /> Shops</Link></li>
          <li><Link to="/login"><FaSignInAlt /> Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
