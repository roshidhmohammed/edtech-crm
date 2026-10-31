import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ["react", "react-dom"],
    alias: [
      {
        find: /^@\/components/,
        replacement: path.resolve(__dirname, "./@/components"),
      },
      {
        find: /^@\/lib/,
        replacement: path.resolve(__dirname, "./@/lib"),
      },
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  },
   build: {
    outDir: "dist",
    sourcemap: false,
  },
})
