import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate replaces useHistory in React Router v6+
import DashboardCard from '../../components/crm/dashboard/DashboardCard';
import MapOverview from '../../components/crm/dashboard/MapOverview';
import SalesGraph from '../../components/crm/dashboard/SalesGraph';
import './CrmDashboard.css';

const CrmDashboard = () => {
  const navigate = useNavigate(); // useNavigate for navigation

  const navigateTo = (path) => {
    navigate(path); // Updated navigation function using useNavigate
  };

  return (
    <div className="crm-dashboard">
      <h1>CRM Dashboard</h1>

      <div className="dashboard-overview">
        <DashboardCard 
          title="Total Customers" 
          endValue={150} 
          onClick={() => navigateTo('/crm/customers')} 
        />
        <DashboardCard 
          title="Total Orders" 
          endValue={500} 
          onClick={() => navigateTo('/crm/orders')} 
        />
        <DashboardCard 
          title="Total Products" 
          endValue={200} 
          onClick={() => navigateTo('/crm/products')} 
        />
      </div>

      {/* Map and Graph Section */}
      <div className="dashboard-map-graph">
        <MapOverview />
        <SalesGraph />
      </div>
    </div>
  );
};

export default CrmDashboard;
