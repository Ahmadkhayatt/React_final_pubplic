import React, { useState, useEffect } from "react";
import Header from "../Components/Header";

const DeleteUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get-users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users || []); // Assume backend sends `{ users: [...] }`
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete a user
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/delete-user/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("User deleted successfully");
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while trying to delete the user.");
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center h-screen bg-blue-200">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Delete User</h2>

          {loading ? (
            <p className="text-center text-gray-700">Loading users...</p>
          ) : users.length > 0 ? (
            <ul className="space-y-4">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex justify-between items-center border p-4 rounded-md"
                >
                  <div>
                    <p className="font-bold">{user.name}</p>
                    <p className="text-sm text-gray-600">ID: {user.id}</p>
                  </div>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-700">No users found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DeleteUserPage;
