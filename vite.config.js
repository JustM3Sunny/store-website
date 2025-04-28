import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const generateSourceMap = !isProduction;

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
    },
    build: {
      sourcemap: generateSourceMap,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }

            if (/\.module\.css|\.css$/.test(id)) {
              return 'styles';
            }

            if (/\.(png|jpg|jpeg|gif|svg)$/.test(id)) {
              return 'assets';
            }
          },
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
        },
      },
      minify: isProduction,
      assetsInlineLimit: 4096,
      // Consider using a more robust approach for large projects
      // to prevent inlining too many assets.  A function can be used here.
      // assetsInlineLimit: (assetInfo) => {
      //   return assetInfo.size < 4096;
      // },
    },
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : [],
    },
    // base: isProduction ? '/your-repo-name/' : '/',
    // Add cache busting for service workers
    // publicDir: 'public', // Ensure public directory is correctly configured
  };
});