// src/components/Menu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menu.css'; // Import the styles

const Menu = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/product/1">Product 1</Link></li>
        <li><Link to="/product/2">Product 2</Link></li>
      </ul>
    </nav>
  );
};

export default Menu;