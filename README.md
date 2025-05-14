# MF Shell - Single-SPA Microfrontend

This is a microfrontend shell application built with React, TypeScript, Vite, and single-spa. It uses import maps for module federation instead of webpack module federation.

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

## Building for Production

```bash
pnpm build
```

## Integration with a Single-SPA Root Application

### 1. Set Up Import Maps

In your root HTML file, add import maps for proper module resolution:

```html
<script type="importmap">
  {
    "imports": {
      "react": "https://cdn.jsdelivr.net/npm/react@19/umd/react.production.min.js",
      "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@19/umd/react-dom.production.min.js",
      "shared_ui/theme": "https://terrabostmanagestorage.blob.core.windows.net/$web/shared-ui/theme.js",
      "shared_ui/components": "https://terrabostmanagestorage.blob.core.windows.net/$web/shared-ui/components.js",
      "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.9.0/lib/system/single-spa.min.js",
      "@mf/shell": "https://terrabostmanagestorage.blob.core.windows.net/$web/mf-shell/mf-shell.js"
    }
  }
</script>

<!-- For browsers that don't support import maps -->
<script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/system.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/extras/amd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/extras/named-exports.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/extras/named-register.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/systemjs@6.8.3/dist/extras/use-default.min.js"></script>
```

For local development, use:
```json
{
  "imports": {
    "@mf/shell": "http://localhost:5173/mf-shell.js",
    "shared_ui/theme": "http://localhost:5174/shared-ui/theme.js",
    "shared_ui/components": "http://localhost:5174/shared-ui/components.js"
  }
}
```

### 2. Register the Application

In your root application:

```javascript
import { registerApplication, start } from 'single-spa';

registerApplication({
  name: '@mf/shell',
  app: () => System.import('@mf/shell'),
  activeWhen: ['/'] // Modify this path as needed
});

start();
```

## Development Notes

- During development, local stubs are used for shared_ui components and theme
- In production, these are resolved via import maps at runtime
- External dependencies are properly marked in vite.config.ts
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
