import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import singleSpa from 'vite-plugin-single-spa';
import path from "path"
import tailwindcss from "@tailwindcss/vite"


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    singleSpa({ 
      type: 'mife', 
      serverPort: 5173, 
      spaEntryPoints: './src/main.tsx'
    })
  ], 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      
    },
  },
  server: {
    port: 5173,
    cors: {
      origin: '*',
      methods: ['GET'],
    }
  },
  build: {
    target: 'esnext',
    modulePreload: false,
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      // Mark these imports as external so they're resolved at runtime via import maps
      external: [
        'shared-ui/components',
        'shared-ui/theme',
        /^shared-ui\/.*/
      ],
      output: {
        format: 'system',
        entryFileNames: 'mf-shell.js',
      },
    },
  },
});
