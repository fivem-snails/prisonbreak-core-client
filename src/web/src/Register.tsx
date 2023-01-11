import {FC, useState} from 'react';
import {format, subYears} from 'date-fns';
import {BsFillPersonBadgeFill} from 'react-icons/bs';
import {HiOutlineArrowRight} from 'react-icons/hi';
import {FaDiscord} from 'react-icons/fa';
import './css/Register.css';

interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    birthdate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('https://alta-core-front/registerCharacter', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {'Content-Type': 'application/json'},
    });

    console.log(await response.json());
  };

  return (
    <div className="character-creator animate__animated animate__fadeInDown">
      <form
        className="form animate__animated animate__fadeIn"
        onSubmit={handleSubmit}
      >
        <section className="header">
          <h1 className="title">Begin your roleplay adventure.</h1>
          <p className="description">
            In order to fully immerse yourself in the world of roleplaying, it
            is essential that you create a compelling and well-developed
            character.
          </p>
        </section>

        <section className="field">
          <label htmlFor="firstname">Firstname</label>

          <div className="input-wrapper">
            <BsFillPersonBadgeFill />
            <input
              className="input"
              id="firstname"
              type="text"
              placeholder="John"
              required={true}
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
        </section>

        <section className="field">
          <label htmlFor="lastname">Lastname</label>

          <div className="input-wrapper">
            <BsFillPersonBadgeFill />
            <input
              className="input"
              id="lastname"
              type="text"
              placeholder="Phee"
              required={true}
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
        </section>

        <section className="field">
          <label htmlFor="birthdate">Birthdate</label>
          <div className="input-wrapper">
            <input
              className="input"
              id="birthdate"
              type="date"
              min="1980-01-01"
              max={format(subYears(new Date(), 19), 'yyyy-MM-dd')}
              required={true}
              value={formData.birthdate}
              onChange={handleChange}
            />
          </div>
        </section>

        <section className="footer">
          <button className="button" type="submit">
            Create new character
            <HiOutlineArrowRight className="ml-1 h-6 w-6" />
          </button>

          <a
            className="button"
            href="https://dsc.gg/altarp"
            rel="noreferrer"
            target="_blank"
          >
            <FaDiscord className="ml-1 h-6 w-6" />
          </a>
        </section>
      </form>{' '}
    </div>
  );
};

export default Register;
