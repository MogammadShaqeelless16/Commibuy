import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Ensure this CSS file exists

// Sample testimonials data
const testimonials = [
  { id: 1, text: "Commibuy has transformed how we reach customers. A fantastic platform for small businesses!", author: "Sarah M." },
  { id: 2, text: "Easy to use and great for local shopping. Love the community feel!", author: "James R." },
  { id: 3, text: "A must-have for anyone looking to support local businesses in Cape Town.", author: "Emma L." },
];

function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to Commibuy</h1>
        <p>Your gateway to discovering and supporting local businesses.</p>
        <Link to="/signup" className="btn">Get Started</Link>
      </section>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          At Commibuy, our mission is to empower local businesses by connecting them with their communities.
          We provide a platform for small businesses to thrive, offering users a seamless way to discover, shop,
          and support businesses in their local area.
        </p>
      </section>

      <section className="slogan">
        <h2>Our Slogan</h2>
        <p>"Empowering Local Commerce, Building Stronger Communities."</p>
      </section>

      <section className="business-growth">
        <h2>Let Us Help Your Business Grow</h2>
        <p>
          Are you a local business looking to expand your reach? Join us today and feature your products on 
          our platform. We offer free business listings, promotional tools, and competitive commission rates 
          to help you grow in the digital marketplace.
        </p>
        <Link to="/signup" className="btn">Join Us Now</Link>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-slider">
          <button className="prev" onClick={prevTestimonial}>❮</button>
          <div className="testimonial-content">
            <p>{testimonials[currentTestimonial].text}</p>
            <footer>— {testimonials[currentTestimonial].author}</footer>
          </div>
          <button className="next" onClick={nextTestimonial}>❯</button>
        </div>
      </section>

      <section className="newsletter">
        <h2>Stay Updated</h2>
        <p>Keep up with the latest local deals and updates. Subscribe to our newsletter!</p>
        <form>
          <input type="email" placeholder="Enter your email" />
          <button type="submit" className="btn">Subscribe</button>
        </form>
      </section>
    </div>
  );
}

export default HomePage;
