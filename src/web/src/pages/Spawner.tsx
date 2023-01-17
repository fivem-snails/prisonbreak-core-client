import {FC} from 'react';
// import Location from '../components/Location';
// import LocationOne from '../assets/location_one.webp';
// import LocationTwo from '../assets/location_two.webp';
// import LocationTree from '../assets/location_tree.webp';
import '../css/Spawner.css';

interface SpawnerProps {}

const Spawner: FC<SpawnerProps> = () => {
  return (
    <div className="spawner animate__animated animate__fadeInDown">
      <div className="locations">
        {/* <Location img={LocationOne} location="Police Department" />
        <Location img={LocationTwo} location="Legion Square" />
        <Location img={LocationTree} location="City Hospital" /> */}
      </div>
    </div>
  );
};

export default Spawner;
