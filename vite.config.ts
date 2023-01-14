import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import UnoCSS from "unocss/vite";

// import path from 'path'

export default defineConfig({
  // root: path.join(__dirname, 'src'),
  plugins: [
    react(),
    UnoCSS({
      /* options */
    }),
  ],
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: [
            "Chrome >= 45",
            "Safari >= 10",
            "iOS >= 10",
            "Firefox >= 40",
            "Edge >= 15",
          ],
        }),
      ],
    },
  },
});
