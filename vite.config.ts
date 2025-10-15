/// <reference types="vitest" />

import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    include: ['src/tests/**/*.test.tsx'],
  },
});