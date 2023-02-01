import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import Register from './pages/Register';
import Spawner from './pages/Spawner';
import Deathscreen from './pages/Deathscreen';
import Hud from './pages/Hud';
import './index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

// window.postMessage({deathscreen: true, cash: 25000.0}, '*');
window.addEventListener('message', (event) => {
  const data = event.data;

  if (data.registerform === true) {
    root.render(
      <StrictMode>
        <Register />
      </StrictMode>,
    );
  } else if (data.registerform === false) {
    root.render('');
  }

  if (data.spawner === true) {
    root.render(
      <StrictMode>
        <Spawner />
      </StrictMode>,
    );
  } else if (data.spawner === false) {
    root.render('');
  }

  if (data.deathscreen === true) {
    root.render(
      <StrictMode>
        <Deathscreen />
      </StrictMode>,
    );
  } else if (data.deathscreen === false) {
    root.render('');
  }

  if (data.moneyhud === true) {
    root.render(
      <StrictMode>
        <Hud cash={data.cash} />
      </StrictMode>,
    );
  } else if (data.moneyhud === false) {
    root.render('');
  }
});
