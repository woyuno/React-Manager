import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 3000,
    proxy: {
      '/api': 'https://m1.apifoxmock.com/m1/7546357-7283098-default',
    },
  },
  resolve: {
    alias: {
      // path需要安装  npm i @types/node -D
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
})
