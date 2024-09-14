import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Create or update this CSS file
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Logo from './Logo';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
      <Link to="/" className="logo">
          <Logo /> {/* Use the Logo component */}
        </Link>
        <div className="footer-links">
          <ul>
            <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="footer-info">
          <p>&copy; {new Date().getFullYear()} SupportBuy. All rights reserved.</p>
          <p>Made by <a href="https://www.softglitchsolutions.com" target="_blank" rel="noopener noreferrer">SoftGlitchSolutions</a></p>
          <div className="social-media">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
