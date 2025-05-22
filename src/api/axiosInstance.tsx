// src/api/axiosInstance.ts
import axios from "axios";

const isProd = import.meta.env.MODE === "production";

const axiosInstance = axios.create({
  baseURL: isProd
    ? import.meta.env.VITE_API_URL // 프로덕션: 절대 API URL
    : "/", // 개발: Vite proxy 사용
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
