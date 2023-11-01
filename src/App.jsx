import React, { useContext } from "react";
import { DarkModeContext } from "./context/DarkModeContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { Home } from "./pages/home/Home";
import { List } from "./pages/list/List";
import { Single } from "./pages/single/Single";
import { New } from "./pages/new/New";
import { NewHotel } from "./pages/newHotel/NewHotel";
import { NewRoom } from "./pages/newRoom/NewRoom";
import { AuthContext } from "./context/AuthContext";
import Register from "./pages/register/Register";
import "./dark.scss";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import { userInputs } from "./formSource";
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
          <Route path="users">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List columns={userColumns} />
                </ProtectedRoute>
              }
            />
            <Route
              path=":userId"
              element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <New inputs={userInputs} title="Add New User" />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="hotels">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List columns={hotelColumns} />
                </ProtectedRoute>
              }
            />
            <Route
              path=":productId"
              element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <NewHotel />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="rooms">
            <Route
              index
              element={
                <ProtectedRoute>
                  <List columns={roomColumns} />
                </ProtectedRoute>
              }
            />
            <Route
              path=":productId"
              element={
                <ProtectedRoute>
                  <Single />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <NewRoom />
                </ProtectedRoute>
              }
            />{" "}
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
