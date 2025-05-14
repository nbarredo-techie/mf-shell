import './index.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' 
import Root from './root.component'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
