import React, { useEffect, useState } from 'react';
import { GetAllClient } from '../../utils/APIFunc';
import { NavigatePages } from '../../utils/APIFunc';
const DashBoard = ({ username }) => {


  const Options = [
    {name:'See All Client',
    path:"/AllClients"},
    {name:'Update A Client',
        path:"/UpdateClient"},
        {name:'Delete A Client',
            path:"/DeleteClient"},];

  const [allClients, setAllClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetAllClient(); // assuming it's async
      setAllClients(response);
    };
    fetchData();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-black px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Welcome, {username}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {Options.map((option) => (
          <button
            key={option.name}
            className="bg-blue-600 text-white text-lg font-medium py-4 px-6 rounded-2xl shadow-md hover:bg-blue-700 transition duration-300 cursor-pointer"
            onSubmit={NavigatePages(option.path)}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Optional: Display number of clients */}
      {allClients.length > 0 && (
        <p className="mt-10 text-gray-600">
          You currently have <span className="font-semibold">{allClients.length}</span> clients.
        </p>
      )}
    </section>
  );
};

export default DashBoard;
