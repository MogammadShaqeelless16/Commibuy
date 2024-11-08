// components/AppDownload.js
import React from 'react';
import './AppDownload.css';
import googlePlayIcon from '../assets/google-play-icon.svg'; // Replace with your actual icon paths
import appStoreIcon from '../assets/app-store-icon.svg'; // Replace with your actual icon paths

function AppDownload() {
  return (
    <section className="app-download">
      <h2>Download Our Mobile App for Free</h2>
      <p>
      Discover local businesses and hire community members for tasks with our mobile app, streamlining your shopping and support for the local economy.
      </p>
      <div className="download-buttons">
        <a href="https://commiploy.netlify.app/" target="_blank" rel="noopener noreferrer" className="download-btn">
          <img src={googlePlayIcon} alt="Download on Google Play" className="download-icon" />
        </a>
        <a href="https://commiploy.netlify.app/" target="_blank" rel="noopener noreferrer" className="download-btn">
          <img src={appStoreIcon} alt="Download on the App Store" className="download-icon" />
        </a>
      </div>
    </section>
  );
}

export default AppDownload;
