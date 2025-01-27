import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/createUser": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/loginuser": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/loginadmin": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/directions": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      // Add more routes if needed
    },
  },
  build: {
    sourcemap: true,
  },
});
