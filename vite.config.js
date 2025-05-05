import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const enableSourceMap = !isProduction;

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 3000,
      open: true,
      hmr: {
        overlay: !isProduction, // Disable overlay in production for cleaner error handling
      },
    },
    build: {
      sourcemap: enableSourceMap,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }

            if (/\.(module\.css|\.css)$/.test(id)) {
              return 'styles';
            }

            if (/\.(png|jpg|jpeg|gif|svg)$/.test(id)) {
              return 'assets';
            }
            // Add a default chunk for other files
            return 'app';
          },
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
        },
      },
      minify: isProduction,
      assetsInlineLimit: 4096,
      target: 'esnext', // Modern browsers support ESNext features
      // Enable brotli compression for production builds
      brotliSize: isProduction,
      // Enable manifest file for production builds
      manifest: isProduction,
      // Enable tree shaking
      treeShaking: true,
      // Optimize CSS by removing unused styles
      cssCodeSplit: true,
    },
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [],
      // Minify JS and CSS files
      minify: isProduction,
    },
  };
});