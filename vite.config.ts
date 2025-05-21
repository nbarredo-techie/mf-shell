import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react'; // Removed
import react from '@vitejs/plugin-react'; // Added back
import path from 'path'; 

export default defineConfig({
  plugins: [
    react(), // Assuming this is intended to be @vitejs/plugin-react
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      
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
      preserveEntrySignatures: 'strict', // Changed from 'exports-only'
      external: [
        'react',
        'react-dom',
        'single-spa', // Add single-spa to externals
        'shared-ui', // Added back shared-ui
        /^shared-ui\/.*/, // Added back shared-ui regex
      ],
      output: {
        format: 'system', // Changed to SystemJS format
        name: '@mf/shell', // Added SystemJS module name
        entryFileNames: 'mf-shell.js', // Define the output filename
        preserveModules: false,
        exports: 'named', // Explicitly set how exports are handled
      },
    },
    cssCodeSplit: true, 
  },
   
});
