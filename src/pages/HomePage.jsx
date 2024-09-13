// src/pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Create this CSS file

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to SupportBuy</h1>
        <p>Your one-stop solution for all your shopping needs.</p>
        <Link to="/signup" className="btn">Get Started</Link>
      </section>
    </div>
  );
}

export default HomePage;