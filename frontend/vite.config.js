import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from 'dotenv';

// Load environment variables from .env file (if applicable)
dotenv.config();

// Get port from environment variables, fallback to 5400
const PORT = process.env.PORT || 5400;

export default defineConfig(({ command }) => {
  return {
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
      host: '0.0.0.0',
      port: PORT,
      allowedHosts: command === 'serve' 
        ? ['along9ja.onrender.com'] // Production host
        : ['localhost'], // Development host
    },
    build: {
      sourcemap: true,
    },
  };
});
