import { useState } from "react";
import {
  RouterProvider,
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import HomePage from "./Pages/HomePage";
import ErrorPage from "./Components/errorHandle";
import AddUserPage from "./Pages/add_user";
import Recognition from "./Pages/Recognition";
import PasswordProtection from "./Components/ProtectionDel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/Recognition",
    element: <Recognition />,
  },
  {
    path: "/add-user",
    element: <AddUserPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/delete-user",
    element: <PasswordProtection />,
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
