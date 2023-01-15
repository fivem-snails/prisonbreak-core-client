import {FC, useState, useEffect} from 'react';
import {BsEmojiDizzy} from 'react-icons/bs';
import './css/Deathscreen.css';

interface DeathscreenProps {}

const Deathscreen: FC<DeathscreenProps> = () => {
  const [timeLeft, setTimeLeft] = useState(100);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else if (timeLeft === 0) {
        await fetch('https://alta-core-front/spawn', {
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
        </div>
        <div className="timer-wrapper">
          <h2 className="timer">
            {timeLeft === 0
              ? 'You will respawn soon'
              : `${timeLeft} seconds left`}
            {timeLeft > 0 ? (
              <div>
                <BsEmojiDizzy />
              </div>
            ) : null}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Deathscreen;
