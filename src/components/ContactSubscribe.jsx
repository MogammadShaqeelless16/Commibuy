// components/ContactSubscribe.js
import React from 'react';
import './ContactSubscribe.css';

function ContactSubscribe() {
  return (
    <section className="contact-subscribe">
      <h2>Get in Touch</h2>
      <form>
        <input type="email" placeholder="Enter your email" />
        <button type="submit" className="btn">Subscribe</button>
      </form>
    </section>
  );
}

export default ContactSubscribe;
