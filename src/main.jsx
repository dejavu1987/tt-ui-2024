import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "animate.css";
import "./index.scss";
import { ClerkProvider } from "@clerk/clerk-react";

const publishableKey =
  process.env.VITE_CLERK_PUBLISHABLE_KEY ||
  "pk_test_ZnJhbmstZ29hdC00NC5jbGVyay5hY2NvdW50cy5kZXYk";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
