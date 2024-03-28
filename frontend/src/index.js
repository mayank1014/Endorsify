import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for ReactDOM
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

reportWebVitals();
