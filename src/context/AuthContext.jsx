// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoadingContext } from "./LoadingContext";

// Create AuthContext
export const AuthContext = createContext();

// Custom hook for easier access to AuthContext
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);

  // Base URL for backend
  axios.defaults.baseURL = "http://localhost:5000/api";
  axios.defaults.headers.common["Content-Type"] = "application/json";

  // ======================================================
  // ✅ CHECK TOKEN ON FIRST LOAD
  // ======================================================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [setLoading]);

  // ======================================================
  // ✅ LOGIN
  // ======================================================
  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await axios.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${res.data.token}`;

      setUser(res.data.user);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // ✅ REGISTER
  // ======================================================
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const res = await axios.post("/auth/register", { name, email, password });

      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${res.data.token}`;

      setUser(res.data.user);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // ✅ UPDATE PROFILE (name / email / password)
  // ======================================================
  const updateProfile = async (updatedFields) => {
    try {
      setLoading(true);

      const res = await axios.put("/auth/update-profile", updatedFields);

      setUser(res.data.user);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update profile failed", err);
      alert("Could not update profile");
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // ✅ LOGOUT
  // ======================================================
  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/login");
  };

  // ======================================================
  // 🔥 PROVIDE EVERYTHING TO THE APP
  // ======================================================
  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}
