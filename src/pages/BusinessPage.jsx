import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchActiveBusinesses } from '../supabase/businessOperations'; // Adjust the path as needed
import './BusinessPage.css'; // Ensure this CSS file is updated

function BusinessPage() {
  const [businesses, setBusinesses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadBusinesses() {
      const activeBusinesses = await fetchActiveBusinesses();
      setBusinesses(activeBusinesses);
    }

    loadBusinesses();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBusinesses = businesses.filter(business =>
    business.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="business-page">
      <h1>Business Listing</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by business name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button className="search-button">
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div className="business-list">
        {filteredBusinesses.length ? (
          filteredBusinesses.map(business => (
            <div key={business.id} className="business-card">
              <Link to={`/business/${business.slug}`} className="business-link">
                <div className="business-header">
                  {business.header_image && <img src={business.header_image} alt="Business Header" />}
                </div>
                <div className="business-info">
                  <h2>{business.name}</h2>
                  <p>{business.address}</p>
                  <a href={business.website_url} target="_blank" rel="noopener noreferrer" className="btn">
                    <i className="fas fa-globe"></i> Visit Website
                  </a>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No active businesses found.</p>
        )}
      </div>
    </div>
  );
}

export default BusinessPage;
