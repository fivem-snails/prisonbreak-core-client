import { differenceInYears, format, subYears } from 'date-fns';
import { useState } from 'react';
import { RxDiscordLogo } from 'react-icons/rx';
import { handleSubmit } from './submit';

export default function () {
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const currentDate = new Date();
  const maxDate = subYears(currentDate, 18);
  const minDate = subYears(currentDate, 50);

  const maxDateFormatted = format(maxDate, 'yyyy-MM-dd');
  const minDateFormatted = format(minDate, 'yyyy-MM-dd');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const calculateAge = () => {
    if (selectedDate) {
      const birthDate = new Date(selectedDate);
      const age = differenceInYears(currentDate, birthDate);
      return age;
    }
    return null;
  };

  return (
    <div className="animate__animated animate__fadeInDown flex justify-center items-center bg-[#1118278c] h-screen">
      <div className="bg-gray-800 p-6 rounded-sm shadow-lg">
        {!showForm && (
          <div className="flex flex-col gap-6 w-[40vw]">
            <h2 className="text-3xl text-gray-200 font-bold">
              Design your character story
            </h2>

            <p className="text-gray-400">
              Welcome to our server! It's time to unleash your creativity and
              design a unique character for yourself. Let your imagination run
              wild as you embark on an exciting journey in our virtual world.
              Craft a captivating backstory that defines who your character is
              and what motivates them.
            </p>

            <div className="flex flex-row gap-2">
              <button
                onClick={() => setShowForm(true)}
                className="btn w-fit btn-primary"
              >
                Get started
              </button>
              <a
                href="https://discord.gg/2YJYfXJ"
                target="_blank"
                className="flex gap-2 btn btn-icon btn-secondary w-fit "
              >
                <RxDiscordLogo />
                Join our community In Discord
              </a>
            </div>
          </div>
        )}
        {showForm && (
          <form
            className="animate__animated animate__fadeInDown flex flex-col gap-6 w-fit"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl text-gray-200 font-bold">
              Fill up the form to get started
            </h1>

            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="first_name" className="text-gray-400">
                  First name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="form-input"
                  placeholder="John"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="last_name" className="text-gray-400">
                  Last name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="form-input"
                  placeholder="Doe"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="date_of_birth" className="text-gray-400">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  min={minDateFormatted}
                  max={maxDateFormatted}
                  onChange={handleDateChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="first_name" className="text-gray-400">
                Character story
              </label>
              <textarea
                id="character_story"
                name="character_story"
                cols="30"
                rows="3"
                className="form-input"
                required
              ></textarea>
            </div>

            {selectedDate && (
              <p className="text-gray-400">
                Your character's age will be {calculateAge()} years old.
              </p>
            )}

            <input
              type="submit"
              className="btn w-full btn-primary"
              value="Create"
            />
          </form>
        )}
      </div>
    </div>
  );
}
