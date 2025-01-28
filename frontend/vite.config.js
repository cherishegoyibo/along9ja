import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from 'dotenv';

const PORT = process.env.FPORT;

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/backend": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
    port: PORT || 3000,
  },
  build: {
    sourcemap: true,
  },
});
