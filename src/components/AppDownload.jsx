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
        Experience the convenience of local shopping on the go! Our mobile app allows you to discover and support local businesses with ease.
      </p>
      <div className="download-buttons">
        <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="download-btn">
          <img src={googlePlayIcon} alt="Download on Google Play" className="download-icon" />
        </a>
        <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="download-btn">
          <img src={appStoreIcon} alt="Download on the App Store" className="download-icon" />
        </a>
      </div>
    </section>
  );
}

export default AppDownload;
