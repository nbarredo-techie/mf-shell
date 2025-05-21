import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; 

export default defineConfig({
  plugins: [
    react(),
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
      input: 'src/main.tsx', // Specify the entry point
      external: [
        'react',
        'react-dom',
        'single-spa', // Add single-spa to externals
        'shared-ui',
        'shared-ui/components',
        'shared-ui/theme',
        /^shared-ui\/.*/, // Corrected regex
      ],
      output: {
        format: 'system', // Output SystemJS format
        entryFileNames: 'mf-shell.js', // Define the output filename
        name: '@mf/shell', // Define the SystemJS module name
        preserveModules: false, 
      },
    },
    cssCodeSplit: true, 
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
