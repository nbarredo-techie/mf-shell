import './index.css';
import { StrictMode } from 'react';
import { createRoot, Root as ReactRoot } from 'react-dom/client';
import Root from './root.component';

let rootInstance: ReactRoot | null = null;

export function bootstrap(): Promise<void> {
  return Promise.resolve();
}

export function mount(props: { domElement?: Element }): Promise<void> {
  return Promise.resolve().then(() => {
    const domElement =
      props.domElement ||
      document.getElementById('single-spa-application:@mf/shell') ||
      document.getElementById('root');

    if (!domElement) {
      console.error('[mf-shell] No DOM element found to mount app.');
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
