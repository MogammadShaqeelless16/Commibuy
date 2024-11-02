// components/AboutMission.js
import React from 'react';
import './AboutMission.css';

function AboutMission() {
  return (
    <section className="about-mission">
      <div className="mission-text">
        <h2>Our Mission</h2>
        <p>
          At Commibuy, our mission is to empower local businesses by connecting them with their communities.
          We provide a platform for small businesses to thrive, offering users a seamless way to discover, shop,
          and support businesses in their local area.
        </p>
      </div>
      <div className="mission-image">
        <img src="/path-to-mission-image.jpg" alt="Our Mission" />
      </div>
    </section>
  );
}

export default AboutMission;
