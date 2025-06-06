import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClientAbsence = () => {
    const Navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white px-4">

      <h1 className="text-3xl font-bold mb-2">Client Not Found</h1>
      <p className="text-gray-400 mb-6 text-center">
        The client you're looking for doesn't exist or has been removed.
      </p>
  
        <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md transition duration-200 hover:cursor-pointer"
        onClick={(e)=>{
            e.preventDefault();
            Navigate("/search")
        }}>
          Back to Clients
        </button>
    </div>
  );
};

export default ClientAbsence;
