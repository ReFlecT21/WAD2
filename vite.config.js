import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  proxy: {
    "/test": "https://us-central1-wad2-395904.cloudfunctions.net/app",
  },
  plugins: [react()],
})
