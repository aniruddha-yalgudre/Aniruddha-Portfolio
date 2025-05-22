import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Set to your subpath if needed (e.g., '/repo-name/')
  plugins: [react()],
  assetsInclude: ['**/*.glsl', '**/*.html'],
  server: {
    host: true,  
    port: 5177,
  },
})
