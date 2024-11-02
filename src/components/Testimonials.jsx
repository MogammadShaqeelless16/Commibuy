// components/Testimonials.js
import React, { useState } from 'react';
import './Testimonials.css';

const testimonials = [
  { id: 1, text: "Commibuy has transformed how we reach customers. A fantastic platform for small businesses!", author: "Sarah M." },
  { id: 2, text: "Easy to use and great for local shopping. Love the community feel!", author: "James R." },
  { id: 3, text: "A must-have for anyone looking to support local businesses in Cape Town.", author: "Emma L." },
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
  );
}

export default Testimonials;
