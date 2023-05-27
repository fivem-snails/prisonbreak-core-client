import { createRoot } from 'react-dom/client';
import './index.css';
import DeathScreen from './components/DeathScreen/DeathScreen';
import RegisterForm from './components/RegisterForm/RegisterForm';

const root = createRoot(document.getElementById('root') as HTMLElement);

window.postMessage({ registerForm: true }, '*');
window.addEventListener('message', (event: MessageEvent) => {
    const { registerForm, deathScreen } = event.data;

    registerForm === true &&
        root.render(
            <div className="nui">
                <RegisterForm />
            </div>,
        );

    deathScreen === true &&
        root.render(
            <div className="nui">
                <DeathScreen />
            </div>,
        );

    registerForm === false && root.render(<div className="nui"></div>);
    deathScreen === false && root.render(<div className="nui"></div>);
});
