// components/ContactSubscribe.js
import React, { useState } from 'react';
import './ContactSubscribe.css';

function ContactSubscribe() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle subscription logic here (e.g., API call)
    console.log(`Subscribed with email: ${email}`);
    setEmail(''); // Reset the input after submission
  };

  return (
    <section className="contact-subscribe">
      <h2>Get in Touch</h2>
      <p>Subscribe to our newsletter for the latest updates and offers!</p>
      <form onSubmit={handleSubmit} className="subscribe-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required
          aria-label="Email address"
          className="email-input"
        />
        <button type="submit" className="subscribe-button">Subscribe</button>
      </form>
    </section>
  );
}

export default ContactSubscribe;
