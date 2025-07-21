import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  define: {
    global: "globalThis", // 👈 fix cho `global` undefined
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico"],
      manifest: {
        name: "LuckyGift",
        short_name: "LuckyGift",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#d32f2f",
        icons: [
          {
            src: "/lucky-icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/lucky-icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/lucky-icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "/lucky-icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/lucky-icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "/lucky-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/lucky-icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/lucky-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
