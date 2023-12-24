import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        content: 'src/content/index.jsx',
        background: 'src/background/index.js',
        style: 'src/content/style.css',
        popup: 'src/popup/index.html'
      },
      output: {
        entryFileNames: 'src/[name]/index.js',
        chunkFileNames: 'assets/js/[name].js',
        assetFileNames: 'assets/[ext]/[name].[ext]'
      },
    },
  },
})
