import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import vitePluginSingleSpa  from 'vite-plugin-single-spa';
import path from 'path'; 

export default defineConfig({
  plugins: [
    react(), 
    vitePluginSingleSpa({
      type: 'mife', 
      serverPort: 5173,
      spaEntryPoints: './src/main.tsx', 
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'shared-ui': path.resolve(__dirname, './src/stubs/shared-ui.js'),
    },
  },
  server: {
    port: 5173,
    cors: {
      origin: '*',
      methods: ['GET'],
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'shared-ui',
        'shared-ui/components',
        'shared-ui/theme',
        /^shared-ui\/.*/,
      ],
      output: {
        format: 'es', 
        preserveModules: false, // important to avoid multiple chunks
      },
    },
    cssCodeSplit: true, // Ensure this is at the build level
  },
  optimizeDeps: {
    exclude: [
      'shared-ui',
      'shared-ui/components',
      'shared-ui/theme'
    ],
  },
  ssr: {
    external: [
      'shared-ui',
      'shared-ui/components',
      'shared-ui/theme'
    ],
  },
});
