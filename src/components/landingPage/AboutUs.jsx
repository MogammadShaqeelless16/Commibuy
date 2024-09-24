import React from 'react';

function AboutUs({ business }) {
  return (
    <section className="about-section">
      <div className="container">
        <h2>About Us</h2>
        <p>{business.description}</p>
      </div>
    </section>
  );
}

export default AboutUs;
