// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // 카카오 콜백용: 원본 경로 그대로 포워딩
      "/callback": {
        target: "https://dev.dug-out.store",
        changeOrigin: true,
        secure: false,
        // rewrite 를 빼면 요청 URL이 그대로 /callback?... 로 전달됩니다
      },
      "/home": {
        target: "https://dev.dug-out.store",
        changeOrigin: true,
        secure: false,
        rewrite: path => path,

      },

      // /api → https://dev.dug-out.store 에 포워딩, /api 프리픽스는 제거
      "/api": {
        target: "https://dev.dug-out.store",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
