// Card.js
import React from 'react';

const Card = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-blue-100 p-6 rounded-lg py-8 text-center">
      <Icon className="text-blue-600 text-2xl mb-4" />
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Card;