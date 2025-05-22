import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // mode 에 따라 .env, .env.development, .env.production 등을 자동 로드
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/login/nickname': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/login/cheeringTeamId': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/api/kakao': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/mypage/myTemp': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/mypage/editInfo': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
        '/mypage/editPersonal': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/callback': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
        '/home': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: path => path,
        },
      },
    },
    define: {
      // 프론트 코드에서 import.meta.env.VITE_KAKAO_JS_KEY 로 접근 가능
      'process.env': {},
    },
  }
})
