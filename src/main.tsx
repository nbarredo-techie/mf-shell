import './index.css';
import React, { StrictMode } from 'react';
import { createRoot, type Root as ReactRoot } from 'react-dom/client';
import RootComponent from './root.component';

let rootInstance: ReactRoot | null = null;

export function bootstrap(): Promise<void> {
  return Promise.resolve();
}

export function mount(props: { domElement?: Element }): Promise<void> {
  return Promise.resolve().then(() => {
    console.log("@mf/shell mounted", props);

    const el =
      props.domElement ||
      document.getElementById('single-spa-application:@mf/shell') ||
      document.getElementById('root');

    if (!el) {
      throw new Error('[mf-shell] No element found for mounting.');
    }

    rootInstance = createRoot(el);
    rootInstance.render(
      <StrictMode>
        <RootComponent />
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
