import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate replaces useHistory in React Router v6+
import CountUp from 'react-countup';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import 'leaflet/dist/leaflet.css';
import './CrmDashboard.css';

// Sample data for the sales graph
const salesData = [
  { name: 'Week 1', sales: 4000, profits: 2400 },
  { name: 'Week 2', sales: 3000, profits: 1398 },
  { name: 'Week 3', sales: 2000, profits: 9800 },
  { name: 'Week 4', sales: 2780, profits: 3908 },
];

function CrmDashboard() {
  const navigate = useNavigate(); // useNavigate for navigation

  const navigateTo = (path) => {
    navigate(path); // Updated navigation function using useNavigate
  };

  return (
    <div className="crm-dashboard">
      <h1>CRM Dashboard</h1>

      <div className="dashboard-overview">
        {/* Total Customers */}
        <div
          className="dashboard-card"
          onClick={() => navigateTo('/crm/customers')} // Navigate to customers page
        >
          <h2>Total Customers</h2>
          <p>
            <CountUp start={0} end={150} duration={2.5} separator="," />
          </p>
        </div>

        {/* Total Orders */}
        <div
          className="dashboard-card"
          onClick={() => navigateTo('/crm/orders')} // Navigate to orders page
        >
          <h2>Total Orders</h2>
          <p>
            <CountUp start={0} end={500} duration={2.5} separator="," />
          </p>
        </div>

        {/* Total Products */}
        <div
          className="dashboard-card"
          onClick={() => navigateTo('/crm/products')} // Navigate to products page
        >
          <h2>Total Products</h2>
          <p>
            <CountUp start={0} end={200} duration={2.5} separator="," />
          </p>
        </div>
      </div>

      {/* Map and Graph Section */}
      <div className="dashboard-map-graph">
        {/* Map Container */}
        <div className="map-container">
          <h2>Map Overview</h2>
          <MapContainer center={[-30.5595, 22.9375]} zoom={6} className="leaflet-container">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[-30.5595, 22.9375]}>
              <Popup>South Africa Overview</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Sales and Profits Graph */}
        <div className="graph-container">
          <h2>Sales and Profits</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="profits" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default CrmDashboard;
