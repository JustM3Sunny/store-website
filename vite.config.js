import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const generateSourceMap = !isProduction; // Explicitly define sourcemap generation

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
      sourcemap: generateSourceMap, // Generate sourcemaps for easier debugging
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
            // Prioritize splitting based on file type for better caching
            if (id.includes('.module.css') || id.includes('.css')) {
              return 'styles';
            }
            if (id.includes('.svg') || id.includes('.png') || id.includes('.jpg') || id.includes('.jpeg') || id.includes('.gif')) {
              return 'assets';
            }
          },
          chunkFileNames: 'js/[name]-[hash].js', // Add hash to chunk file names for better caching
          entryFileNames: 'js/[name]-[hash].js', // Add hash to entry file names for better caching
          assetFileNames: '[ext]/[name]-[hash].[ext]', // Add hash to asset file names for better caching
        },
      },
      minify: isProduction, // Enable minification in production
      assetsInlineLimit: 4096, // Default is 4096, explicitly set for clarity.  Files smaller than this will be base64 encoded.
    },
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [], // Remove console.log and debugger statements in production
    },
    // Add a base URL for deployment to a subdirectory
    // base: isProduction ? '/your-repo-name/' : '/',
  };
});