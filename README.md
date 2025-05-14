# MF Shell - Single-SPA Microfrontend

This is a microfrontend shell application built with React, TypeScript, Vite, and single-spa.

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

To use this microfrontend in a single-spa root application, follow these steps:

### 1. Add Import Map Entry

In your root application, make sure to include this microfrontend in your import map:

```json
{
  "imports": {
    "@mf/shell": "https://your-deployment-url/mf-shell.js"
  }
}
```

For local development, use:
```json
{
  "imports": {
    "@mf/shell": "http://localhost:5173/mf-shell.js"
  }
}
```

### 2. Register the Application

In your root application:

```javascript
import { registerApplication } from 'single-spa';

registerApplication({
  name: '@mf/shell',
  app: () => System.import('@mf/shell'),
  activeWhen: ['/'] // Modify this path as needed
});
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
