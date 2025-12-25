// utils/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.BASE_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (แนบ token)
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (handle error กลาง)
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log(error);
    
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";
    return {
      code: error?.response?.code ?? 400,
      msg: error?.response?.data.msg ?? "not found.",
    };
  }
);

export default api;
