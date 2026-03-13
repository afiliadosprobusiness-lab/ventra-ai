import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("recharts")) return "charts";
          if (id.includes("framer-motion")) return "motion";
          if (
            id.includes("@radix-ui") ||
            id.includes("cmdk") ||
            id.includes("sonner") ||
            id.includes("vaul") ||
            id.includes("react-day-picker") ||
            id.includes("input-otp")
          ) {
            return "ui";
          }
          if (
            id.includes("react-router") ||
            id.includes("@tanstack/react-query") ||
            id.includes("react-hook-form") ||
            id.includes("zod")
          ) {
            return "app-core";
          }
          if (id.includes("react") || id.includes("scheduler")) return "react-vendor";
        },
      },
    },
  },
}));
