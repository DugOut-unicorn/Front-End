import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // 닉네임 중복 확인
      '/login/nickname': {
        target: 'https://dev.dug-out.store',
        changeOrigin: true,
        secure: false,
      },
      // 응원팀 업데이트
      '/login/cheeringTeamId': {
        target: 'https://dev.dug-out.store',
        changeOrigin: true,
        secure: false,
      },
      // 카카오 로그인 유저 정보 조회
      '/api/kakao': {
        target: 'https://dev.dug-out.store',
        changeOrigin: true,
        secure: false,
      },
      // 마이페이지 내 temp 조회 API
      '/mypage/myTemp': {
        target: 'https://dev.dug-out.store',
        changeOrigin: true,
        secure: false,
      },
      // 프로필 일반 정보 수정 (이름/이메일 제외)
      '/mypage/editInfo': {
        target: 'https://dev.dug-out.store',
        changeOrigin: true,
        secure: false,
      },
      // 프로필 상세 수정 API
      '/mypage/editPersonal': {
        target: 'https://dev.dug-out.store',
        changeOrigin: true,
        secure: false,
      },
      // OAuth callback
      '/callback': {
        target: 'https://dev.dug-out.store',
        changeOrigin: true,
        secure: false,
      },
      //home
      "/home": {
        target: "https://dev.dug-out.store",
        changeOrigin: true,
        secure: false,
        rewrite: path => path,
      },
    },
  },
});
