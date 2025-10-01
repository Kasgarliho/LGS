import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // DÜZELTME: Doğru paket import edildi
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Test bölümü daha önce eklenmişti, burada olduğundan emin oluyoruz.
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  },
}));