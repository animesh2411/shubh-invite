import { defineConfig } from 'vite';

export default defineConfig({
  base: '/shubh-invite/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});
