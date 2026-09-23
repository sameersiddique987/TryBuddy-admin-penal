

import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  // baseURL: "https://try-buddy-backend-i87j.vercel.app",
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor: Har call se pehle token add karega
API.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;