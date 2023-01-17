import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import Register from './pages/Register';
import Spawner from './pages/Spawner';
import Deathscreen from './pages/Deathscreen';
import Hud from './pages/Hud';
import './index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

// window.postMessage({showHud: true, cash: 25000.0}, '*');
window.addEventListener('message', (event) => {
  const data = event.data;

  if (data.showRegisterform === true) {
    root.render(
      <StrictMode>
        <Register />
      </StrictMode>,
    );
  } else if (data.showRegisterform === false) {
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

  if (data.showHud === true) {
    root.render(
      <StrictMode>
        <Hud cash={data.cash} />
      </StrictMode>,
    );
  } else if (data.showHud === false) {
    root.render('');
  }
});
