import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the sales graph
const salesData = [
  { name: 'Week 1', sales: 4000, profits: 2400 },
  { name: 'Week 2', sales: 3000, profits: 1398 },
  { name: 'Week 3', sales: 2000, profits: 9800 },
  { name: 'Week 4', sales: 2780, profits: 3908 },
];

const SalesGraph = () => {
  return (
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
  );
};

export default SalesGraph;
