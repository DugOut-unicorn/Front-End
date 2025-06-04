// src/api/axiosInstance.ts
import axios from "axios";

const token = localStorage.getItem("jwtToken");

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 모든 환경에서 API URL 사용
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export default axiosInstance;
