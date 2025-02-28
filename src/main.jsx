import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for React 18
import "./index.css";
import App from "./App";
import { Analytics } from "@vercel/analytics/react"; // Import the Analytics component

// Create the root using `ReactDOM.createRoot` for React 18
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app inside the root element
root.render(
  <React.StrictMode>
    <App />
    <Analytics /> {/* Add Analytics here */}
  </React.StrictMode>
);
