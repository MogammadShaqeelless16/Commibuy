import React from 'react';
import './PricingPage.css';

function PricingPage() {
  return (
    <div className="pricing-page">
      <h1 className="pricing-header">Choose Your Plan</h1>
      <div className="pricing-cards">
        {/* Bronze Plan (Free) */}
        <div className="pricing-card">
          <div className="card-header bronze">
            <h2>Bronze</h2>
            <p>$0/month</p>
          </div>
          <div className="card-body">
            <ul>
              <li><i className="fas fa-building"></i> 1 Business</li>
              <li><i className="fas fa-user"></i> 1 User</li>
              <li><i className="fas fa-clipboard-list"></i> CRM System for Lead Management</li>
              <li><i className="fas fa-box"></i> Process Orders</li>
              <li><i className="fas fa-globe"></i> Website Listing</li>
            </ul>
          </div>
          <div className="card-footer">
            <button className="btn-select">Get Started</button>
          </div>
        </div>

        {/* Silver Plan (Standard) */}
        <div className="pricing-card">
          <div className="card-header silver">
            <h2>Silver</h2>
            <p>$10/month</p>
          </div>
          <div className="card-body">
            <ul>
              <li><i className="fas fa-building"></i> 3 Businesses</li>
              <li><i className="fas fa-users"></i> Up to 20 Users</li>
              <li><i className="fas fa-envelope"></i> Email Integration</li>
              <li><i className="fas fa-share-alt"></i> Social Media Integration</li>
              <li><i className="fas fa-globe"></i> Website Listing</li>
            </ul>
          </div>
          <div className="card-footer">
            <button className="btn-select">Choose Silver</button>
          </div>
        </div>

        {/* Gold Plan (Enterprise) */}
        <div className="pricing-card">
          <div className="card-header gold">
            <h2>Gold</h2>
            <p>Custom Pricing</p>
          </div>
          <div className="card-body">
            <ul>
              <li><i className="fas fa-building"></i> Unlimited Businesses</li>
              <li><i className="fas fa-users-cog"></i> Unlimited Users</li>
              <li><i className="fas fa-envelope"></i> Full Email Integration</li>
              <li><i className="fas fa-share-alt"></i> Full Social Media Integration</li>
              <li><i className="fas fa-globe"></i> Website Listing & CRM Suite</li>
              <li><i className="fas fa-cogs"></i> Custom Features Available</li>
            </ul>
          </div>
          <div className="card-footer">
            <button className="btn-select">Contact Us</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
