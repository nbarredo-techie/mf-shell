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
      spaEntryPoints: './src/main.tsx'
    }),
    federation({
      name: 'mf-shell',
      remotes: {
        shared_ui: 'https://terrabostmanagestorage.blob.core.windows.net/$web/assets/shared-ui/remoteEntry.js',
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
      // Add the problematic imports to external
      external: [
        'class-variance-authority',
        // Add shared_ui imports here
        'shared_ui',
        'shared_ui/theme',
        'shared_ui/components',
        /^shared_ui\/.*/  // This will match any import starting with shared_ui/
      ],
      output: {
        format: 'system',
        entryFileNames: 'mf-shell.js',
      },
    },
  },
});
