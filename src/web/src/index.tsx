import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './css/index.css';
import Register from './Register';

const root = createRoot(document.getElementById('root') as HTMLElement);

// window.postMessage({enable: true}, '*');
window.addEventListener('message', (event) => {
  const data = event.data;
  console.log(JSON.stringify(data));

  if (data.enable === true) {
    root.render(
      <StrictMode>
        <Register />
      </StrictMode>,
    );
  } else if (data.enable === false) {
    root.render('');
  }
});
