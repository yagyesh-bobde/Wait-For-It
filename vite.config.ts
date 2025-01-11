import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import Checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    react(),
    Checker({
      typescript: false, // Disable TypeScript type checking
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
