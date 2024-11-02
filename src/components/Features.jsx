// components/Features.js
import React from 'react';
import { FaShoppingCart, FaHandshake, FaBullhorn } from 'react-icons/fa'; // Sample icons
import './Features.css';

function Features() {
  return (
    <section className="features">
      <h2>Features</h2>
      <div className="feature-boxes">
        <div className="feature-box">
          <FaShoppingCart className="feature-icon" />
          <h3>Seamless Shopping</h3>
          <p>Discover and support local businesses effortlessly with our intuitive shopping experience.</p>
        </div>
        <div className="feature-box">
          <FaHandshake className="feature-icon" />
          <h3>Community Support</h3>
          <p>Connect directly with local vendors and help foster a stronger community bond.</p>
        </div>
        <div className="feature-box">
          <FaBullhorn className="feature-icon" />
          <h3>Promotional Tools</h3>
          <p>Take advantage of powerful promotional tools to reach more customers and grow your business.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;
