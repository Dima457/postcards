import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Важно для SPA на Vercel
  build: {
    outDir: 'dist',
    sourcemap: false, // Отключаем для продакшена
    rollupOptions: {
      input: {
        main: './index.html' // Из первой конфигурации
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          utils: ['axios', 'html-to-image']
        }
      }
    }
  },
  server: {
    port: 5173
  }
})