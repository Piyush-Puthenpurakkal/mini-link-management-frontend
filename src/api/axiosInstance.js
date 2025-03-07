import axios from "axios";

const API = axios.create({
  baseURL: "https://mini-link-management-backend.onrender.com",
});

// Automatically add Authorization token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("No token found in LocalStorage!");
  }

  return config;
});

export default API;
