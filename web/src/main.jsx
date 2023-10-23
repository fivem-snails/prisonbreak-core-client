import { createRoot } from 'react-dom/client';
import './index.css';
import RegisterForm from './views/RegisterForm';
import DeathScreen from './views/DeathScreen';
import PlayerHud from './views/PlayerHud';

// const user = {
//   id: 22,
//   first_name: 'Leo',
//   last_name: 'Beloff',
//   birth_date: '2023-07-01',
// };

// window.postMessage({
//   type: 'PLAYERHUD',
//   visible: true,
//   data: user,
// });

const root = createRoot(document.getElementById('root'));
const componentMap = {
  REGISTERFORM: () => <RegisterForm />,
  PLAYERHUD: ({ id, first_name, last_name, birth_date }) => (
    <PlayerHud
      id={id}
      firstName={first_name}
      lastName={last_name}
      birthDate={birth_date}
    />
  ),
  DEATHSCREEN: () => <DeathScreen />,
};

window.addEventListener('message', (event) => {
  const { type, visible, data } = event.data;
  const component = componentMap[type];
  const isVisible = visible !== undefined ? visible : false;

  if (component) {
    root.render(isVisible ? component(data) : null);
  }
});
