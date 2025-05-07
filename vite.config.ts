// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // 카카오 콜백용
      "/callback": {
        //target: "http://localhost:8080",
         //target: "https://www.dug-out.store",
         //target: "https://api.dug-out.store",
         target: "https://dev.dug-out.store",
        changeOrigin: true,
        secure: false,
      },
      // /api 로 시작하는 모든 요청을 로컬 백엔드로 프록시
      "/api": {
        //target: "http://localhost:8080",
         //target: "https://www.dug-out.store",
         //target: "https://api.dug-out.store",
        target: "https://dev.dug-out.store",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
