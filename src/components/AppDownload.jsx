// components/AppDownload.js
import React from 'react';
import './AppDownload.css';

function AppDownload() {
  return (
    <section className="app-download">
      <h2>Download Our App</h2>
      <div className="download-buttons">
        <button className="btn">Google Play</button>
        <button className="btn">App Store</button>
      </div>
    </section>
  );
}

export default AppDownload;
