// ErrorPage.js
import React from "react";
import { useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import errorImage from "../assets/error1.gif";

const ErrorPage = () => {
  const navigate = useNavigate(); // useNavigate replaces useHistory

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img src={errorImage} alt="image" className=" mx-auto" />
      <h1 className="text-4xl font-bold animate-slide-up-delay-200">
        Page Not Found
      </h1>
      <p className="text-lg text-gray-600 animate-slide-up-delay-400">
        Sorry, the page you're looking for doesn't exist , don't go so far -_-.
      </p>
      <button
        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded hover:bg-gradient-to-l hover:from-blue-700 hover:to-blue-500 mt-4 shadow-md"
        onClick={() => navigate("/")} // Navigate to the home page
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
