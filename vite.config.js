import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  // لتضمين ملفات الفيديو مثل m4v
  assetsInclude: ["**/*.m4v"],

  resolve: {
    alias: {
      api: path.resolve(__dirname, "src/api"),
      app: path.resolve(__dirname, "src/app"),
      assets: path.resolve(__dirname, "src/assets"),
      components: path.resolve(__dirname, "src/components"),
      hooks: path.resolve(__dirname, "src/hooks"),
      layout: path.resolve(__dirname, "src/layout"),
      store: path.resolve(__dirname, "src/store"),
      theme: path.resolve(__dirname, "src/theme"),
      utils: path.resolve(__dirname, "src/utils"),
      interceptor: path.resolve(__dirname, "src/interceptor"),
      middlewares: path.resolve(__dirname, "src/middlewares"),
      i18n: path.resolve(__dirname, "src/i18n"),
    },
  },
});
