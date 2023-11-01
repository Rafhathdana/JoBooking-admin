import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { DarkModeContextProvider } from "./context/DarkModeContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthContextProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
