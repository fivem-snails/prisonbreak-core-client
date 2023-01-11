import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './css/index.css';
import Register from './Register';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <Register />
  </StrictMode>,
);
