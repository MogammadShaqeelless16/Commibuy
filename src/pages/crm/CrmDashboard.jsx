import React from 'react';
import './CrmDashboard.css'; // Optional CSS

function CrmDashboard() {
  return (
    <div className="crm-dashboard">
      <h1>CRM Dashboard</h1>
      <div className="dashboard-overview">
        <div className="dashboard-card">
          <h2>Total Customers</h2>
          <p>150</p>
        </div>
        <div className="dashboard-card">
          <h2>Total Orders</h2>
          <p>500</p>
        </div>
        <div className="dashboard-card">
          <h2>Total Products</h2>
          <p>200</p>
        </div>
      </div>
    </div>
  );
}

export default CrmDashboard;