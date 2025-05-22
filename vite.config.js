import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or vue, svelte, etc.

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  // This is important for Vercel deployments
  base: './',
})
