import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Make sure this CSS file is updated accordingly
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Logo from './Logo'; // Ensure this path is correct

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo Section */}
          <div className="footer-logo">
            <Link to="/" className="logo-link">
              <Logo />
            </Link>
          </div>

          {/* Centered "Made by" Section */}
          <div className="footer-info">
            <p>&copy; {new Date().getFullYear()} SupportBuy. All rights reserved.</p>
            <p>Made by <a href="https://www.softglitchsolutions.com" target="_blank" rel="noopener noreferrer">SoftGlitchSolutions</a></p>
          </div>

          {/* Social Media Links */}
          <div className="footer-social">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaFacebook />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
