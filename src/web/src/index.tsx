import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import Register from './Register';
import Spawner from './Spawner';
import Deathscreen from './Deathscreen';
import './css/index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

// window.postMessage({showDeathscreen: true}, '*');
window.addEventListener('message', (event) => {
  const data = event.data;

  if (data.showRegister === true) {
    root.render(
      <StrictMode>
        <Register />
      </StrictMode>,
    );
  } else if (data.showRegister === false) {
    root.render('');
  }

  if (data.showSpawner === true) {
    root.render(
      <StrictMode>
        <Spawner />
      </StrictMode>,
    );
  } else if (data.showSpawner === false) {
    root.render('');
  }

  if (data.showDeathscreen === true) {
    root.render(
      <StrictMode>
        <Deathscreen />
      </StrictMode>,
    );
  } else if (data.showDeathscreen === false) {
    root.render('');
  }
});
