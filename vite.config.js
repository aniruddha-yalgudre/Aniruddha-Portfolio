import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Aniruddha-Portfolio/' : '/', // Adjust base dynamically based on environment
  plugins: [react()],
  assetsInclude: ['**/*.glsl', '**/*.html'],
  server: {
    host: true,  
    port: 5177,
  },
  build: {
    outDir: 'dist', // Ensure the output directory is correctly set
  },
})
