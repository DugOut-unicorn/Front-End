// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // mode 에 따라 .env, .env.development, .env.production 등을 자동 로드
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        // 닉네임 중복 확인
        "/login/nickname": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        // 응원팀 업데이트
        "/login/cheeringTeamId": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        // 카카오 로그인 유저 정보 조회
        "/api/kakao": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        // 마이페이지 내 temp 조회 API
        "/mypage/myTemp": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        // 프로필 일반 정보 수정 (이름/이메일 제외)
        "/mypage/editInfo": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        // 프로필 상세 수정 API
        "/mypage/editPersonal": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        // OAuth callback
        "/callback": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        // home
        "/home": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path,
        },
      },
    },
    define: {
      // 프론트 코드에서 import.meta.env.VITE_KAKAO_JS_KEY 로 접근 가능
      "process.env": {},
    },
  };
});
