import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

function ContactDetails({ business }) {
  return (
    <section className="contact-details-section" id="contact-section">
      <div className="container">
        <div className="contact-details-grid">
          <div className="contact-info">
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <div className="info-text">
                <p className="info-title">Address</p>
                <p>{business.address}</p>
              </div>
            </div>
            <div className="info-item">
              <FaPhoneAlt className="info-icon" />
              <div className="info-text">
                <p className="info-title">Phone</p>
                <a href={`tel:${business.contact_number}`}>{business.contact_number}</a>
              </div>
            </div>
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <div className="info-text">
                <p className="info-title">Email</p>
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </div>
            </div>
          </div>
          <div className="social-media">
            <p className="social-title">Follow us</p>
            <div className="social-links">
              {business.social_media_facebook && (
                <a href={business.social_media_facebook} target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaFacebook />
                </a>
              )}
              {business.social_media_twitter && (
                <a href={business.social_media_twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaTwitter />
                </a>
              )}
              {business.social_media_instagram && (
                <a href={business.social_media_instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaInstagram />
                </a>
              )}
              {business.social_media_linkedin && (
                <a href={business.social_media_linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                  <FaLinkedin />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactDetails;
