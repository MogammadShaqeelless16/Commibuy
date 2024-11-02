// components/HeroBanner.js
import React from 'react';
import { Link } from 'react-router-dom';
import phone from '../assets/phone.png';
import './HeroBanner.css';

function HeroBanner() {
  return (

    <section className="hero-banner">
      <div className="hero-text">
        <h1>Welcome to Commibuy</h1>
        <p>Your gateway to discovering and supporting local businesses.</p>
        <Link to="/signup" className="btn">Get Started</Link>
      </div>
      <div className="hero-image">
        <img src={phone} alt="Supporting local businesses" />
      </div>
    </section>
    
  );
}

export default HeroBanner;
