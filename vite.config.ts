// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  // 1) .env 파일에서 VITE_* 변수 읽어오기
  const fileEnv = loadEnv(mode, process.cwd(), "");
  // 2) GitHub Actions 등에서 process.env로 주입된 값을 우선 사용하고, 없으면 fileEnv 값 사용
  const VITE_API_URL = process.env.VITE_API_URL ?? fileEnv.VITE_API_URL;
  const VITE_KAKAO_JS_KEY =
    process.env.VITE_KAKAO_JS_KEY ?? fileEnv.VITE_KAKAO_JS_KEY;

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        // 닉네임 중복 확인
        "/login/nickname": {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        // 응원팀 업데이트
        "/login/cheeringTeamId": {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        // 카카오 로그인 유저 정보 조회
        "/api/kakao": {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        // 마이페이지 내 temp 조회 API
        "/mypage/myTemp": {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        // 프로필 일반 정보 수정 (이름/이메일 제외)
        "/mypage/editInfo": {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        // 프로필 상세 수정 API
        "/mypage/editPersonal": {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        // OAuth callback
        "/callback": {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        // home API
        "/home": {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: path => path,
        },
        // record API
        "/record": {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: path => path,
        },
        // chat API
        "/api/chat": {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: path => path,
        },
      },
    },
    define: {
      // 프로덕션 번들에서 import.meta.env.VITE_* 으로 접근 가능하게 강제 주입
      "import.meta.env.VITE_API_URL": JSON.stringify(VITE_API_URL),
      "import.meta.env.VITE_KAKAO_JS_KEY": JSON.stringify(VITE_KAKAO_JS_KEY),
      global: "window",
    },
  };
});
