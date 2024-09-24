import React, { useState } from 'react';

function Navigation({ business, handleMenuClick, template }) {
  const [isOpen, setIsOpen] = useState(false); // State to control sidebar visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the sidebar
  };

  return (
    <>
      <nav className={`top-nav ${isOpen ? 'open' : ''}`}>
        <div className="logo">
          {business.logo_url && (
            <a href="/">
              <img src={business.logo_url} alt="Business Logo" className="logo-img" />
            </a>
          )}
          <h1 className="business-name">{business.name}</h1>
        </div>

        {/* Conditional rendering for different templates */}
        {template == 'template2' ? (
          <>
            <ul className="nav-menu">
              <li>
                <button onClick={() => { handleMenuClick('services-section'); toggleMenu(); }}>Services</button>
              </li>
              <li>
                <button onClick={() => { handleMenuClick('products-section'); toggleMenu(); }}>Products</button>
              </li>
              <li>
                <button onClick={() => { handleMenuClick('contact-section'); toggleMenu(); }}>Contact</button>
              </li>
            </ul>
            <button className="close-btn" onClick={toggleMenu}>&times;</button>
            <button className="open-btn" onClick={toggleMenu}>☰ Open Menu</button>
          </>
        ) : (
          // Normal navigation for other templates
          <ul className="nav-menu">
            <li>
              <button onClick={() => handleMenuClick('services-section')}>Services</button>
            </li>
            <li>
              <button onClick={() => handleMenuClick('products-section')}>Products</button>
            </li>
            <li>
              <button onClick={() => handleMenuClick('contact-section')}>Contact</button>
            </li>
          </ul>
        )}
      </nav>

      {/* Main Content */}
      <div className={`main-content ${isOpen ? 'shifted' : ''}`}>
        {/* Your main content goes here */}
      </div>
    </>
  );
}

export default Navigation;
