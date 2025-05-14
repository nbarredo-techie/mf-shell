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
    lib: {
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: 'mf-shell',
      formats: ['system'],  
      fileName: () => 'mf-shell.js',
    },
    rollupOptions: {
      input: './src/main.tsx',
      preserveEntrySignatures: 'strict', 
      external: [
        'shared-ui',
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
