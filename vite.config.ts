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
      // 'shared-ui': path.resolve(__dirname, 'src/stubs/shared-ui.js'), // Comment out or remove this line
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
      input: 'src/main.tsx',
      preserveEntrySignatures: 'strict',
      external: [
        'react',
        'react-dom',
        'single-spa',
        'shared-ui', // Added shared-ui
        /^@mf\/.*/, // Corrected regex
      ],
      output: {
        format: 'amd', // Ensure ESM output for build
        name: '@mf/shell',
        entryFileNames: 'mf-shell.js',
        preserveModules: false,
        exports: 'auto',
      },
    },
    cssCodeSplit: true, 
    minify: false
  },
   
});
