import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import type { Root as ReactRoot } from 'react-dom/client';
// src/main.tsx
if (window.System) {
  // Only works if SystemJS is loaded by vite-plugin-federation
  window.System.import('shared_ui/theme');
}

import Root from './root.component';

// Keep track of the root instance
let rootInstance: ReactRoot | null = null;

// Single-spa lifecycle functions
export function bootstrap(): Promise<void> {
  return Promise.resolve();
}

export function mount(props: { domElement?: Element }): Promise<void> {
  return Promise.resolve().then(() => {
    const domElement = props.domElement || document.getElementById('single-spa-application:@mf/shell') || document.getElementById('root');
    if (!domElement) {
      console.error('No DOM element found for mounting @mf/shell');
      return;
    }
    
    rootInstance = createRoot(domElement);
    rootInstance.render(
      <StrictMode>
        <Root />
      </StrictMode>
    );
  });
}

export function unmount(): Promise<void> {
  return Promise.resolve().then(() => {
    if (rootInstance) {
      rootInstance.unmount();
      rootInstance = null;
    }
  });
}

// For local development without single-spa
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (process.env.NODE_ENV === 'development' && typeof (window as any).singleSpaNavigate === 'undefined') {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    mount({ domElement: rootElement });
  }
}