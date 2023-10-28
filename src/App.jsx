import React, { useContext } from "react";
import { DarkModeContext } from "./context/DarkModeContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Home } from "./pages/home/Home";
import { AuthContext } from "./context/AuthContext";
import Register from "./pages/register/Register";
import "./dark.scss";
export default function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { admin } = useContext(AuthContext);
    if (!admin) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
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
