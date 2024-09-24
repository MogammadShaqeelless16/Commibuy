import React from 'react';
import CountUp from 'react-countup';


const DashboardCard = ({ title, endValue, onClick }) => {
  return (
    <div className="dashboard-card" onClick={onClick}>
      <h2>{title}</h2>
      <p>
        <CountUp start={0} end={endValue} duration={2.5} separator="," />
      </p>
    </div>
  );
};

export default DashboardCard;
