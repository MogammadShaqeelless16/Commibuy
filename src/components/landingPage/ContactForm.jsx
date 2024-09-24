import React from 'react';
import Map from './Map'; // Adjust the path according to your file structure

function ContactForm({
  contactForm,
  handleFormChange,
  handleFormSubmit,
  formStatus,
  showSuccessPopup,
  handleClosePopup,
  mapCenter, // New prop for map center
  mapZoom,   // New prop for map zoom
  business   // New prop for business details
}) {
  return (
    <section className="contact-us-section" id="contact-form-section">
      <div className="container">
        <h2>Get in Touch</h2>
        <div className="contact-us-grid">
          {/* Map Component */}
          <div className="map-container">
            <Map mapCenter={mapCenter} mapZoom={mapZoom} business={business} />
          </div>

          {/* Contact Form Container */}
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <label>
                Name:
                <input type="text" name="name" value={contactForm.name} onChange={handleFormChange} required />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={contactForm.email} onChange={handleFormChange} required />
              </label>
              <label>
                Interest:
                <select name="interest" value={contactForm.interest} onChange={handleFormChange} required>
                  <option value="" disabled>Select an option</option>
                  <option value="products">Products</option>
                  <option value="services">Services</option>
                </select>
              </label>
              <label>
                Message:
                <textarea name="message" value={contactForm.message} onChange={handleFormChange} required></textarea>
              </label>
              <button type="submit" className="submit-button">Send</button>
            </form>
          </div>
        </div>

        {/* Success Popup */}
        {formStatus === 'success' && showSuccessPopup && (
          <div className="success-popup-overlay">
            <div className="success-popup">
              <h2>Thank you for your submission!</h2>
              <p>We will be in contact with you shortly.</p>
              <button onClick={handleClosePopup} className="close-popup-button">Close</button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {formStatus === 'error' && <div className="error-message">There was an error with your submission. Please try again later.</div>}
      </div>
    </section>
  );
}

export default ContactForm;
