import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

import react from '@vitejs/plugin-react';
import postcssNested from 'postcss-nested';
import postcssImport from 'postcss-import';
import postcssVars from 'postcss-css-variables';
import postcssAutoprefixer from 'autoprefixer';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [react()],
  build: {
    assetsDir: 'src',
  },
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  css: {
    postcss: {
      plugins: [postcssImport(), postcssNested(), postcssVars(), postcssAutoprefixer()],
    },
  },
  resolve: {
    alias: [
      { find: '@app/api', replacement: fileURLToPath(new URL('./src/api', import.meta.url)) },
      {
        find: '@app/components',
        replacement: fileURLToPath(new URL('./src/components', import.meta.url)),
      },
      { find: '@app/hooks', replacement: fileURLToPath(new URL('./src/hooks', import.meta.url)) },
      {
        find: '@app/controllers',
        replacement: fileURLToPath(new URL('./src/controllers', import.meta.url)),
      },
      { find: '@app/pages', replacement: fileURLToPath(new URL('./src/pages', import.meta.url)) },
      {
        find: '@app/services',
        replacement: fileURLToPath(new URL('./src/services', import.meta.url)),
      },
      { find: '@app/store', replacement: fileURLToPath(new URL('./src/store', import.meta.url)) },
      { find: '@app/types', replacement: fileURLToPath(new URL('./src/types', import.meta.url)) },
      {
        find: '@app/utils',
        replacement: fileURLToPath(new URL('./src/utils', import.meta.url)),
      },
    ],
  },
});
