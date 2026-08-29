import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

const savedTheme = localStorage.getItem("studyspot-theme");
const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = savedTheme || (preferredDark ? "dark" : "light");

document.documentElement.setAttribute("data-theme", initialTheme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);