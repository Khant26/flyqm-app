import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // In `npm run dev`, same-origin "/api" calls are forwarded to the FastAPI
  // backend so the default VITE_API_BASE_URL=/api works locally.
  const apiProxyTarget = env.VITE_DEV_API_PROXY || "http://localhost:8000";

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": { target: apiProxyTarget, changeOrigin: true },
      },
    },
  };
});
