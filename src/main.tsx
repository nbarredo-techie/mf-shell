import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import type { Root as ReactRoot } from 'react-dom/client';
import Root from './root.component';

// Load shared UI theme if we're in production
// In development, the theme is provided by the stub

// Keep track of the root instance
let rootInstance: ReactRoot | null = null;

// Single-spa lifecycle functions
export function bootstrap(): Promise<void> {
  return Promise.resolve().then(async () => {
    // If in production, attempt to load the shared UI theme
    if (process.env.NODE_ENV === 'production') {
      try {
        // This assumes it will be available via import maps in production
        await import('shared-ui/theme');
      } catch (e) {
        console.warn('Failed to load shared UI theme:', e);
      }
    }
  });
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