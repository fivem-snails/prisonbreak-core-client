import { FC, useState, useEffect } from 'react';
import './DeathScreen.css';

const DeathScreen: FC = () => {
    const [timeLeft, setTimeLeft] = useState(100);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else if (timeLeft === 0) {
                await fetch('https://alta-core-front/closeDeathScreen', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                });
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);

    return (
        <div className="deathscreen animate__animated animate__fadeIn">
            <div className="container">
                <div className="text-wrapper">
                    <h1 className="text ">bleeding</h1>
                </div>
                <div className="timer-wrapper">
                    <div
                        className="timer-bar"
                        style={{ width: `${timeLeft}%` }}
                    ></div>
                </div>

                <div className="text-wrapper">
                    <p className="timer-text">
                        {timeLeft === 0
                            ? `Respawning . . .`
                            : `${timeLeft} seconds left`}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DeathScreen;
