// src/App.jsx
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/profile";
import UpdateProfile from "./pages/UpdateProfile";
import MpesaPayment from "./components/MpesaPayment";

export default function App() {
  return (
    <AuthProvider>
      <Nav />

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-profile"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <MpesaPayment />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
