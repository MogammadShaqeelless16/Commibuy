// components/Footer.js
import React from 'react';
import './Footer.css';
import logo from '../assets/commibuy.png'; // Update the path to your logo image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logo} alt="Commiploy Logo" className="footer-logo-image" />
          <span className="footer-company-name">Commiploy</span>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/terms">Terms and Conditions</a></li>
            <li><a href="/popia">POPIA Act</a></li>
          </ul>
        </div>
        <div className="footer-menu">
          <h3>Admin Menu</h3>
          <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Sign Up</a></li>
          </ul>
          <div className="social-media">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Commiploy. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
