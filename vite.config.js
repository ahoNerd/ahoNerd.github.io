/* eslint-disable no-undef */
import { fileURLToPath, URL } from "url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VuetifyPlugin from "vite-plugin-vuetify"; // untuk tree shaking
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  const appName = process.env.APP_NAME || "Vite + Vue 3 + Vuetify 3";
  const appAuthor = process.env.APP_AUTHOR || "Awesome Author";
  const appThemeColor = process.env.APP_THEME_COLOR || "#00ff00";
  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      VuetifyPlugin(),
      createHtmlPlugin({
        minify: false,
        inject: {
          data: {
            title: appName,
            author: appAuthor,
            themeColor: appThemeColor,
            injectScript: `<meta name="test" content="createHtmlPlugin">`,
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  });
};
