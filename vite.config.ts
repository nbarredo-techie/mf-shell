import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import singleSpa from 'vite-plugin-single-spa';
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import federation from '@originjs/vite-plugin-federation';


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    singleSpa({ 
      type: 'mife', 
      serverPort: 5173, 
      spaEntryPoints: './src/main.tsx'  // Changed to main.tsx which has the single-spa lifecycle functions
    }),
    federation({
      name: 'mf-shell',
      remotes: {
        shared_ui: 'https://terrabostmanagestorage.blob.core.windows.net/$web/shared-ui/remoteEntry.js', // Update URL to match your deployment
      },
      shared: {
        react: { 
          requiredVersion: '^19.0.0',
          import: false
        },
        'react-dom': { 
          requiredVersion: '^19.0.0',
          import: false
        }, 
        'tailwindcss': {
          requiredVersion: '^4.0.0',
          import: false
        } 
      }
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
      output: {
        format: 'system',
        entryFileNames: 'mf-shell.js',
      },
    },
  },
});
