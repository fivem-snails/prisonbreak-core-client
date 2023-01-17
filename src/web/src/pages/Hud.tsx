import {FC} from 'react';
import {GiMoneyStack} from 'react-icons/gi';
import '../css/Hud.css';

interface HudProps {
  cash: string;
}

const Hud: FC<HudProps> = (props) => {
  return (
    <div className="hud animate__animated animate__fadeInDown">
      <div className="card">
        <div className="icon">
          <GiMoneyStack />
        </div>
        <div className="cash">
          <h2>{props.cash}</h2>
        </div>
      </div>
    </div>
  );
};

export default Hud;
