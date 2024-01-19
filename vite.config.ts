import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  resolve: {
    alias: {
      "@app": "/src/",
      "@components": "/src/components",
      "@interfaces": "/src/interfaces",
      "@privateRoute": "/src/privateRoute",
      "@services": "/src/services",
      "@views": "/src/view",
      "@assets": "/src/assets",
      "@serverinfo": "/src/serverinfo",
    },
  },
});
