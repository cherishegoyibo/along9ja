import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import "dotenv/config";

const PORT = process.env.FPORT;

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "0.0.0.0:3000",
        changeOrigin: true,
      },
      "/backend": {
        target: "0.0.0.0:5000",
        changeOrigin: true,
      },
    },
    port: PORT || 3000,
  },
  build: {
    sourcemap: true,
  },
});
