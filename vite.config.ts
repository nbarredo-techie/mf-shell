import { defineConfig, Plugin } from 'vite'; // Import Plugin type
import react from '@vitejs/plugin-react-swc';
import vitePluginSingleSpa  from 'vite-plugin-single-spa';
import path from 'path'; 

// Custom plugin to mark shared-ui as external for the dev server
function externalizeSharedUiPlugin(): Plugin {
  const EXTERNAL_PREFIX = 'vite-external-shared-ui:'; // Unique prefix
  return {
    name: 'vite-plugin-externalize-shared-ui-enhanced',
    enforce: 'pre', 
    resolveId(source, _importer, options) {
      // Only apply this logic for client-side resolution (dev server), not during SSR builds.
      if (options?.ssr) {
        return null;
      }

      // Handle react and react-dom as direct externals (browser resolves via import map)
      if (source === 'react' || source === 'react-dom' || source === 'react-dom/client') {
        return { id: source, external: true };
      }

      if (source === 'shared-ui' || source.startsWith('shared-ui/')) {
        // Mark as external and prefix to be caught by the load hook for shared-ui specific handling.
        return { id: `${EXTERNAL_PREFIX}${source}`, external: true };
      }
      return null; // Let Vite handle other imports normally
    },
    load(id, options) {
      // Only apply this logic for client-side resolution (dev server), not during SSR builds.
      if (options?.ssr) {
        return null;
      }

      if (id.startsWith(EXTERNAL_PREFIX)) {
        const originalId = id.slice(EXTERNAL_PREFIX.length);

        // Check if the originalId is 'shared-ui' which is known to export components.
        // Other 'shared-ui/*' paths might be for other purposes (e.g., CSS, themes for side-effects only)
        if (originalId === 'shared-ui') {
          // List all named exports you expect to use from 'shared-ui'
          const namedExports = ['Button']; // Add more if needed, e.g., ['Button', 'Card']
          const exportStatements = namedExports.map(exp => `export const ${exp} = __resolved_module__.${exp};`).join('\n');

          return `
// Dynamically import the original module, relying on browser's import map for resolution.
const __resolved_module__ = await import('${originalId}');

// Re-export the named exports.
${exportStatements}

// If 'shared-ui' has a default export that needs to be re-exported:
// export default __resolved_module__.default;
`;
        } else {
          // For other 'shared-ui/*' paths, assume they are for side-effects (e.g., CSS, theme registration)
          // or their export structure is unknown/not needed for named re-export here.
          // Just import it to execute its code.
          return `await import('${originalId}');`;
        }
      }
      return null; // Let Vite handle other modules normally
    }
  };
}

export default defineConfig(() => {
  const port = 5173; // Define port for reuse

  return {
    plugins: [
      externalizeSharedUiPlugin(), // Add our custom plugin
      react(), 
      vitePluginSingleSpa({
        type: 'mife', 
        serverPort: port, // Added required serverPort
        spaEntryPoints: ['src/main.tsx'],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), 
      },
    },
    server: {
      port: port, // Use the defined port
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    build: {
      rollupOptions: {
        input: "src/main.tsx",
       // preserveEntrySignatures: true,
        // Ensure shared-ui is treated as external during the build as well
        external: ['react', 'react-dom', 'single-spa', 'shared-ui', /^shared-ui\/.*/],
        output: {
          // This might be needed if you want a specific output format for single-spa
          // format: 'system', // Or 'esm' depending on your single-spa setup
          entryFileNames: 'mf-shell.js',
          globals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
            'single-spa': 'singleSpa',
            'shared-ui': 'sharedUi' // Assuming 'sharedUi' is how it would be exposed if it were a UMD global
          }
        },
      },
      // Target can be adjusted based on your needs, 'esnext' for modern browsers
      target: 'esnext',
    },
    // Key change: prevent Vite from trying to pre-bundle shared-ui
    optimizeDeps: {
      exclude: [
        'react',
        'react-dom',
        'single-spa',
        'shared-ui', // Exclude the base path
        'shared-ui/components', // Example if you import subpaths
        'shared-ui/theme'       // Example if you import subpaths
      ],
    },
    ssr: {
      external: ['shared-ui', 'react', 'react-dom', 'single-spa'],
    },
  };
});
