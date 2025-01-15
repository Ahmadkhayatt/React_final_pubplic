import React, { useState } from "react";
import DeleteUserPage from "../Pages/DeleteUser";
import Header from "./Header";

const PasswordProtection = () => {
  const [password, setPassword] = useState("");
  const [showDeletePage, setShowDeletePage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const correctPassword = "admin123"; // Replace with your desired password

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setShowDeletePage(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Incorrect password. Please try again.");
    }
  };

  if (showDeletePage) {
    return <DeleteUserPage />;
  }

  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-screen bg-blue-200">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">
            Enter Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                required
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm font-bold">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PasswordProtection;
