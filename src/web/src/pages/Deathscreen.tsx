import {FC, useState, useEffect} from 'react';
import '../css/Deathscreen.css';

interface DeathscreenProps {}

const Deathscreen: FC<DeathscreenProps> = () => {
  const [timeLeft, setTimeLeft] = useState(100);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else if (timeLeft === 0) {
        await fetch('https://alta-core-front/hideDeathscreen', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
        });
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div className="deathscreen animate__animated animate__fadeInDown">
      <div className="container">
        <div className="text-wrapper">
          <h1 className="text">You are unconscious</h1>
          {timeLeft === 0 && (
            <h2 className="respawn-text animate__animated animate__fadeInDown">
              Press [E] to Respawn
            </h2>
          )}
        </div>
        <div className="timer-wrapper">
          <div className="timer" style={{width: `${timeLeft}%`}}></div>
        </div>
      </div>
    </div>
  );
};

export default Deathscreen;
