import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        devtools:'src/devtools/index.html',
        content: 'src/content/index.jsx',
        popup: 'src/popup/index.html',
        panel:'src/panel/index.html', 
      },
      output: {
        entryFileNames: 'src/[name]/index.js',
        chunkFileNames: 'assets/js/[name].js',
        assetFileNames: 'assets/[ext]/[name].[ext]'
      },
    },
  },
})
