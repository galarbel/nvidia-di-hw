/// <reference types='vitest' />
/// <reference types="vite-plugin-svgr/client" />
/* eslint-disable import/no-extraneous-dependencies */
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  root: __dirname,

  cacheDir: "../../node_modules/.vite/apps/nvidia-di-client",

  server: {
    port: 4200,
    host: true,
  },

  preview: {
    port: 4300,
    host: "localhost",
  },

  plugins: [
    svgr(),
    react(),
    nxViteTsPaths(),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: "../../dist/apps/nvidia-di-client",
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
