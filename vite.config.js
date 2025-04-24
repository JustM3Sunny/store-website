import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Alias for easy imports from src directory
    },
  },
  server: {
    port: 3000, // Specify a default port
    open: true, // Automatically open the browser on server start
  },
  build: {
    sourcemap: true, // Generate sourcemaps for easier debugging in production
    rollupOptions: {
      // Example of splitting vendor and app code
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [], // Remove console.log and debugger statements in production
  },
});