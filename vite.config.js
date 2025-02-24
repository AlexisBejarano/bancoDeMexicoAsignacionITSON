import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      '/api/banxico': {
        target: 'https://www.banxico.org.mx',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/banxico/, '')
      }
    }
  }
})