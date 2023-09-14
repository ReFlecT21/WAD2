import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{  
    proxy: {
      // "/testAPIasync": "https://us-central1-wad2-395904.cloudfunctions.net/app",
      // "/testAPI": "https://us-central1-wad2-395904.cloudfunctions.net/app",
      '/foodAPI': {
        target: 'https://us-central1-wad2-395904.cloudfunctions.net/app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/foodAPI/, ''),
      },
    },
  },
  plugins: [react()],
})
