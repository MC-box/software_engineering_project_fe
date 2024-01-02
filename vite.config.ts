import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  server: {
    host: '0.0.0.0'
  },
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.ts'),
    }
  }
})