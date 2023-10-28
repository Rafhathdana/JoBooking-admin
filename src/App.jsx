import React, { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Home } from "./pages/home/Home";
export default function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(DarkModeContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
  };
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
      <Routes>
        <Route path="/">
        <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}
