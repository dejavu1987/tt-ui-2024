import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import eslint from "vite-plugin-eslint";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      react(),
      eslint(),
      VitePWA({
        // add this to cache all the imports
        workbox: {
          globPatterns: ["**/*"],
        },
        // add this to cache all the
        // static assets in the public folder
        includeAssets: ["**/*"],
        manifest: {
          theme_color: "#0075af",
          background_color: "#ffffff",
          display: "standalone",
          scope: "/",
          start_url: "/",
          short_name: "PiMP",
          description: "Pingpong Mgmt Platform",
          name: "Pingpong Mgmt Platform",
          icons: [
            {
              src: "/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
    ],
    define: {
      ...Object.keys(env).reduce((prev, key) => {
        prev[`process.env.${key}`] = JSON.stringify(env[key]);
        return prev;
      }, {}),
    },
  };
});
