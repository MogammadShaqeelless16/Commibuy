import React, { useState } from 'react';
import './Testimonials.css';

const testimonials = [
  { id: 1, text: "Commibuy is revolutionizing local commerce, providing small businesses with unparalleled visibility and support.", author: "TechCrunch" },
  { id: 2, text: "A game changer for local shopping, Commibuy fosters a sense of community that benefits both consumers and vendors.", author: "The Local News" },
  { id: 3, text: "With its user-friendly interface and focus on local businesses, Commibuy is a must-try for anyone wanting to support their community.", author: "Business Insider" },
  { id: 4, text: "Commibuy's platform is bridging the gap between consumers and local entrepreneurs, making it easier to shop locally than ever before.", author: "The Herald" },
  { id: 5, text: "Commiploy is a platform that enables communities to purchase local products, access services, and apply for various odd jobs.", author: "ITWeb" }
];

function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials">
      <h2>What the Media Says About Us</h2>
      <div className="testimonial-slider">
        <button className="prev" onClick={prevTestimonial}>❮</button>
        <div className="testimonial-content">
          <p>{testimonials[currentTestimonial].text}</p>
          <footer>— {testimonials[currentTestimonial].author}</footer>
        </div>
        <button className="next" onClick={nextTestimonial}>❯</button>
      </div>
    </section>
  );
}

export default Testimonials;
