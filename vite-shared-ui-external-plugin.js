export default function sharedUiExternalPlugin() {
      return {
        name: 'vite-plugin-shared-ui-external',
        resolveId(source) {
          if (source === 'shared-ui' || source.startsWith('shared-ui/')) {
            // This tells Vite that these imports are external and will be resolved by the browser
            // (e.g., via an import map). Vite will not try to find local files for them.
            return { id: source, external: true };
          }
          return null; // Let Vite handle other imports normally
        }
      };
    }
