import React, { useState, useEffect } from 'react';
import './AboutMission.css';
import slide1 from '../assets/slide1.png';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';

const images = [
  slide1, // Directly reference the image path
  slide2,
  slide3,
  // Add more images as needed
];

function AboutMission() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  return (
    <section className="about-mission">
      <div className="mission-text">
        <h2>Our Mission</h2>
        <p>
          At Commiploy, our mission is to empower local businesses by connecting them with their communities.
          We provide a platform for small businesses to thrive, offering users a seamless way to discover, shop,
          and support businesses in their local area.
        </p>
      </div>
      <div className="mission-gallery">
        <img src={images[currentImageIndex]} alt="Our Mission" className="mission-image" />
      </div>
    </section>
  );
}

export default AboutMission;
