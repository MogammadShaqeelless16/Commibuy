import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaSignInAlt, FaUserPlus, FaGlobe, FaBars, FaTimes, FaDollarSign } from 'react-icons/fa'; // Added FaDollarSign for pricing
import Logo from './Logo'; // Import your custom logo component
import './Menu.css';

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
          <li><Link to="/" onClick={toggleMenu}><FaHome /> Home</Link></li>
          <li><Link to="/about" onClick={toggleMenu}><FaInfoCircle /> About</Link></li>
          <li><Link to="/business" onClick={toggleMenu}><FaGlobe /> Businesses</Link></li>
          <li><Link to="/price" onClick={toggleMenu}><FaDollarSign /> Pricing</Link></li> {/* Added Pricing */}
          <li><Link to="/login" onClick={toggleMenu}><FaSignInAlt /> Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Menu;
