import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "animate.css";
import "./index.scss";
import { ClerkProvider } from "@clerk/clerk-react";

const publishableKey = process.env.VITE_CLERK_PUBLISHABLE_KEY;

console.log("🪵 \x1b[1m publlikey \x1b[0m");
console.log(publishableKey);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
