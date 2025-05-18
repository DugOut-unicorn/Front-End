import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/", // 실제 API 호스트로 바꿔주세요
  timeout: 5000, // 타임아웃 설정 (선택)
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
