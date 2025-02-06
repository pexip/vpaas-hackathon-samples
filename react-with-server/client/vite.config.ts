import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: false,
    host: '127.0.0.1',
    port: 4000,
    open: true
  },
  build: {
    target: 'ES2022'
  }
})
