// src/pages/AboutPage.jsx

import React from 'react';
import './AboutPage.css'; // Ensure this CSS file is created

function AboutPage() {
  return (
    <div className="about-page">
      <h1>About Commibuy</h1>
      <p>
        <strong>Welcome to Commibuy!</strong> We are a Cape Town-based platform dedicated to connecting you with local businesses and products. Our mission is to empower small businesses in your area by offering a seamless online shopping experience.
      </p>
      <p>
        At Commibuy, we specialize in online transactions, making it easy for you to purchase products from your favorite local businesses without leaving your home. Our platform is designed to promote and support small businesses, providing them with the exposure they need to thrive and succeed.
      </p>
      <p>
        <strong>Become a Reseller:</strong> If you're interested in joining our community as a reseller, you can sign up for our seller portal. We’ll add your products to our platform and provide you with a beautiful, custom landing page to showcase your items. Plus, we advertise your products for free!
      </p>
      <p>
        We do charge a small percentage on the products you sell to cover our costs and maintain the platform’s quality. This fee helps us continue supporting local businesses and enhancing your shopping experience.
      </p>
      <p>
        Thank you for choosing Commibuy. Together, we can make a difference in the local economy and support the growth of small businesses in Cape Town.
      </p>
    </div>
  );
}

export default AboutPage;
