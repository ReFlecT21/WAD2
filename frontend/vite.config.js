import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      "/frontend_test": "http://localhost:4001",
    },
  },
  plugins: [react()],
  // build: {
  //   manifest: true,
  //   rollupOptions: {
  //     input: "./src/main.jsx",
  //   },
  // },
  // dev: {
  //   manifest: true,
  //   rollupOptions: {
  //     input: "./src/main.jsx",
  //   },
  // }
})
