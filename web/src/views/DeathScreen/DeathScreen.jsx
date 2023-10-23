import { useEffect, useState } from 'react';
import { GiDeadHead } from 'react-icons/gi';

export default function () {
  const [timer, setTimer] = useState(100);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else if (timer === 0) {
        await fetch('https://alta-core-front/closeDeathScreen', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="animate__animated animate__fadeInDown flex justify-center items-end bg-[#1118278c] h-screen">
      <div className="bg-gray-800 p-6 rounded-sm shadow-lg">
        <h2 className="flex flex-row items-center gap-2 text-3xl text-gray-200 font-bold">
          <GiDeadHead />
          {timer === 0 ? 'You are dead' : `${timer}s left`}
        </h2>
      </div>
    </div>
  );
}
