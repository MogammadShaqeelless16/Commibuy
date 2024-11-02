// components/HeroBanner.js
import React from 'react';
import { Link } from 'react-router-dom';
import phone from '../assets/phone.png';
import './HeroBanner.css';
import AppDownload from './AppDownload'

function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-text">
        <AppDownload/>
      </div>
      <div className="hero-image">
        <img src={phone} alt="Supporting local businesses" />
      </div>
    </section>
  );
}

export default HeroBanner;
