// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const fileEnv = loadEnv(mode, process.cwd(), '');
  const VITE_API_URL = process.env.VITE_API_URL ?? fileEnv.VITE_API_URL;
  const VITE_KAKAO_JS_KEY = process.env.VITE_KAKAO_JS_KEY ?? fileEnv.VITE_KAKAO_JS_KEY;

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/login/nickname': {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/login/cheeringTeamId': {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/login/hasSignedIn': {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/api/kakao': {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/mypage/myTemp': {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/mypage/editInfo': {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/mypage/editPersonal': {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/mypage/withdraw': {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/callback': {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/home': {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path,
        },
        '/mypage/profile-image': {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        // Map weather API proxy
        '/map/weather': {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(VITE_API_URL),
      'import.meta.env.VITE_KAKAO_JS_KEY': JSON.stringify(VITE_KAKAO_JS_KEY),
    },
  };
});
