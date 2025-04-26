import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
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
      sourcemap: !isProduction, // Generate sourcemaps for easier debugging, disable in production for performance if not needed
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
            // Further chunking strategies can be added here for better caching
          },
          chunkFileNames: 'js/[name]-[hash].js', // Add hash to chunk file names for better caching
          entryFileNames: 'js/[name]-[hash].js', // Add hash to entry file names for better caching
          assetFileNames: '[ext]/[name]-[hash].[ext]', // Add hash to asset file names for better caching
        },
      },
      minify: isProduction, // Enable minification in production
    },
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [], // Remove console.log and debugger statements in production
    },
  };
});