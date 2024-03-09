import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "animate.css";
import "./index.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </React.StrictMode>
);
