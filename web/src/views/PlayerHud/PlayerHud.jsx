export default function ({ id, firstName, lastName, birthDate }) {
  return (
    <div className="animate__animated animate__fadeInRight flex justify-end items-center h-screen">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg m-4">
        <div className="flex flex-col gap-4 w-fit">
          <p className="text-gray-400">DOB: {birthDate}</p>
          <h3 className="text-3xl text-gray-200 font-bold">
            Hello, [{id}] {firstName} {lastName}
          </h3>
          <p className="text-gray-400">
            This is the beta UI with player information
          </p>
          <button className="btn w-full btn-primary">Button</button>
        </div>
      </div>
    </div>
  );
}
