// src/HeroSection.js
import React from 'react';
import { MdArrowRightAlt } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HeroSection = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <section className="bg-gradient-to-r from-blue-200 to-blue-500 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white">Streamline Your Attendance Tracking</h2>
        <p className="text-lg text-white mt-4">
          Our attendance system offers an efficient, reliable, and easy-to-use solution for tracking attendance in real time. Manage users, view reports, and automate your workflow seamlessly.
        </p>
        <button
          onClick={() => navigate('/Recognition')} // Navigate to the '/recognition' route
          className="bg-white text-blue-600 font-bold px-6 py-2 rounded-lg mt-6 hover:bg-blue-100"
        >
          Get Started <MdArrowRightAlt className="inline-block ml-2" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
