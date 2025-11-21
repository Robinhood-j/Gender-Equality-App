// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 8000,
});

// Attach token from localStorage to each request (if present)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
