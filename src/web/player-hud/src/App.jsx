import { useState } from 'react';
import './App.css';

export default function App() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center items-center bg-[#f1eeee] h-screen gap-8">
      <div className="flex flex-col gap-8 bg-slate-100 p-8 w-2/4 rounded-tr-lg shadow-lg">
        {!isOpen && (
          <>
            <h1 className="text-5xl text-gray-800 font-bold">
              Design your character
            </h1>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              veritatis delectus ipsa hic aliquid dolore dignissimos possimus
              ducimus labore nulla.
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="btn bg-blue-200 text-gray-800 hover:text-white"
            >
              Get started now
            </button>
          </>
        )}
        {isOpen && (
          <form
            className="flex justify-between"
            onSubmit={(d) => {
              console.log(d);
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <label
                  for="first_name"
                  className="text-3xl text-gray-800 font-bold"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="text-1xl bg-transparent text-gray-800"
                  placeholder="John"
                  required
                />
              </div>
              <div className="flex flex-col gap-4">
                <label
                  for="last_name"
                  className="text-3xl text-gray-800 font-bold"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="last_name"
                  className="text-1xl bg-transparent text-gray-800"
                  placeholder="Doe"
                  required
                />
              </div>
              <div className="flex flex-col gap-4">
                <label
                  for="date_of_birth"
                  className="text-3xl text-gray-800 font-bold"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="date_of_birth"
                  className="text-1xl bg-transparent text-gray-800"
                  required
                />
              </div>

              <div className="flex flex-col">
                <input
                  type="submit"
                  className="btn bg-blue-200 text-gray-800 hover:text-white"
                  value="Submit"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => setIsOpen(false)}
                className="btn bg-transparent hover:bg-transparent text-gray-500"
              >
                X
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
