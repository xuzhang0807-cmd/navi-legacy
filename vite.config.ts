import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const projectRoot = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  root: projectRoot,
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    proxy: {
      "^/api/": {
        target: "http://127.0.0.1:8787",
        changeOrigin: false,
      },
    },
  },
  build: {
    outDir: fileURLToPath(new URL("./frontend", import.meta.url)),
    emptyOutDir: true,
  },
});
