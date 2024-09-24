import React from 'react';

function Header({ business }) {
  return (
    business.header_image && (
      <header className="business-header">
        <div className="header-image">
          <img src={business.header_image} alt="Business Header" />
        </div>
      </header>
    )
  );
}

export default Header;
