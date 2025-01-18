import React from 'react';

const MetricCard = ({ title, value, icon }) => {
  return (
    <div className="p-4 bg-blue-100 rounded shadow-md">
      <p className="text-xl font-bold">{value}</p>
      <p className="text-gray-600">{title}</p>
      <p className="text-2xl text-blue-500">{icon}</p>
    </div>
  );
};

export default MetricCard;
