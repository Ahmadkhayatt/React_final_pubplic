// Import necessary libraries
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-extrabold tracking-wide">
          Attendance System
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="/"
                className="hover:text-gray-200 transition duration-300 ease-in-out text-lg font-medium"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="Recognition"
                className="hover:text-gray-200 transition duration-300 ease-in-out text-lg font-medium"
              >
                Begin Recognition
              </a>
            </li>
            <li>
              <a
                href="add-user"
                className="hover:text-gray-200 transition duration-300 ease-in-out text-lg font-medium"
              >
                Add User
              </a>
            </li>
            <li>
              <a
                href="delete-user"
                className="hover:text-gray-200 transition duration-300 ease-in-out text-lg font-medium"
              >
                Delete User
              </a>
            </li>
            <li>
              <a
                href="reports"
                className="hover:text-gray-200 transition duration-300 ease-in-out text-lg font-medium"
              >
                Reports
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
