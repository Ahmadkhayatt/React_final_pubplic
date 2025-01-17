import React, { useState, useEffect, useRef } from 'react';
import Header from '../Components/Header';

const AddUserPage = () => {
  const formRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    age: '',
    career: '',
    totalAttendance: '',
  });

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const handleReset = () => {
    formRef.current.reset();
    setSelectedFile(null);
    setImageUrl(null);
    setErrorMessage('');
    setFormData({
      id: '',
      name: '',
      age: '',
      career: '',
      totalAttendance: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if profile picture is provided
    if (!selectedFile) {
      setErrorMessage('Profile picture is required.');
      return;
    }

    setErrorMessage('');

    // Prepare the data to send
    const dataToSend = new FormData();
    dataToSend.append('id', formData.id);
    dataToSend.append('name', formData.name);
    dataToSend.append('age', formData.age);
    dataToSend.append('career', formData.career);
    dataToSend.append('total_attendance', formData.totalAttendance);
    dataToSend.append('profile-picture', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:5000/add-user', {
        method: 'POST',
        body: dataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message || 'User added successfully');
        handleReset(); // Reset form after successful submission
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to add user');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Header className="flex-shrink-0" />
      <div className="p-8 bg-gradient-to-r from-blue-200 to-blue-500 flex flex-col">
        <div className="flex-1 flex justify-center items-center overflow-auto">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center mb-6">Add New User</h2>
            <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="id" className="block text-gray-700 text-sm font-bold mb-2">
                  ID
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                  required
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                  required
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="0"
                  step="1"
                  className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                  required
                />
              </div>
              <div>
                <label htmlFor="career" className="block text-gray-700 text-sm font-bold mb-2">
                  Career
                </label>
                <input
                  type="text"
                  id="career"
                  name="career"
                  value={formData.career}
                  onChange={handleInputChange}
                  placeholder="Enter Career"
                  className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                  required
                />
              </div>
              <div>
                <label htmlFor="totalAttendance" className="block text-gray-700 text-sm font-bold mb-2">
                  Total Attendance
                </label>
                <input
                  type="number"
                  id="totalAttendance"
                  name="totalAttendance"
                  value={formData.totalAttendance}
                  onChange={handleInputChange}
                  min="0"
                  step="1"
                  className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                  required
                />
              </div>
              <div>
                <label htmlFor="profile-picture" className="block text-gray-700 text-sm font-bold mb-2">
                  Profile Picture
                </label>
                <input
                  type="file"
                  id="profile-picture"
                  name="profile-picture"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setSelectedFile(file);
                    if (file) {
                      setImageUrl(URL.createObjectURL(file));
                    } else {
                      setImageUrl(null);
                    }
                  }}
                  className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                  required
                />
                {imageUrl && (
                  <div className="overflow-hidden mt-4">
                    <img src={imageUrl} alt="Profile Picture" className="w-24 h-24 object-cover" />
                  </div>
                )}
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}
              <div className="flex flex-col space-y-2">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUserPage;
