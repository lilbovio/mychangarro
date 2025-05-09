import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',
  server: {
    // ✅ Vite usa `middlewareMode` implícitamente, esto es suficiente
    fs: {
      strict: false
    }
  },
  build: {
    outDir: 'dist'
  }
});
