import React from 'react';
import CountUp from 'react-countup';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import './CrmDashboard.css'; // Ensure this CSS file is updated

// Sample data for the sales graph
const salesData = [
  { name: 'Week 1', sales: 4000, profits: 2400 },
  { name: 'Week 2', sales: 3000, profits: 1398 },
  { name: 'Week 3', sales: 2000, profits: 9800 },
  { name: 'Week 4', sales: 2780, profits: 3908 },
];

function CrmDashboard() {
  return (
    <div className="crm-dashboard">
      <h1>CRM Dashboard</h1>
      <div className="dashboard-overview">
        <div className="dashboard-card">
          <h2>Total Customers</h2>
          <p>
            <CountUp start={0} end={150} duration={2.5} separator="," />
          </p>
        </div>
        <div className="dashboard-card">
          <h2>Total Orders</h2>
          <p>
            <CountUp start={0} end={500} duration={2.5} separator="," />
          </p>
        </div>
        <div className="dashboard-card">
          <h2>Total Products</h2>
          <p>
            <CountUp start={0} end={200} duration={2.5} separator="," />
          </p>
        </div>
      </div>

      <div className="dashboard-map-graph">
        <div className="map-container">
          <h2>Map Overview</h2>
          <MapContainer center={[-30.5595, 22.9375]} zoom={6} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[-30.5595, 22.9375]}>
              <Popup>
                South Africa Overview
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="graph-container">
          <h2>Sales and Profits</h2>
          <ResponsiveContainer width="100%" height={400}>
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
