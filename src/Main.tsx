import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import RangesAbout from "./pages/ranges/RangesAbout";
import Ranges from "./pages/ranges/Ranges";
import CalcAbout from "./pages/calculators/CalcAbout";
import NoPage from "./pages/nopage/NoPage";
import Navigate from "./pages/navigate/Navigate";
import "./index.css";

// Define routes and their corresponding components
const router = createBrowserRouter([
  {
    path: "/", // The root path
    element: <Layout />, // Main layout component for the root path
    errorElement: <NoPage />, // Component to render in case of an error
    children: [
      {
        path: "home", // Subpath under the root
        element: <Home />, // Component to render for the 'home' path
      }, {
        path: "ranges-about",
        element: <RangesAbout />,
      } , {
        path: "ranges",
        element: <Ranges />,
      }, {
        path: "calc-about",
        element: <CalcAbout />,
      }, {
        path: "navigate",
        element: <Navigate />,
      }, {
        path: "*", // A path to catch any undefined paths
        element: <NoPage />, // Component for all undefined paths
      }
    ]
  }
])

// Get the root element from the DOM
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// Render the application with the router configuration
root.render(
  <React.StrictMode>
    <RouterProvider router={router} /> {/* Provide the router to the application */}
  </React.StrictMode>
);