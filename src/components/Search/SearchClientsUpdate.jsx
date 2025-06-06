import React, { useState } from 'react';
import { HandleFiltering } from './Filtering';
import { div } from 'three/tsl';
import { useNavigate } from 'react-router-dom';

const SearchClientsUpdate = ({ AllClients }) => {
  const [Condition, setCondition] = useState("name");
  const [UserInput, setUserInput] = useState("");
  const [FilteredClients , setFilteredClients ] = useState([]);
  const [UserHasSearched , setUserHasSearched ] = useState(false);
  const Navigate = useNavigate();

  return (
    <div>
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md w-full max-w-md mx-auto h-full">
      <label className="block text-sm font-semibold mb-2">Search For a Particular Client</label>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="search"
          value={UserInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="flex-1 p-2 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400"
          placeholder="Enter search term..."
        />
        <select
          className="p-2 rounded-md bg-gray-800 border border-gray-600 text-white"
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="phone">Phone</option>
          <option value="bookingdone">Booking Done</option>
        </select>
      </div>

      <div className="flex justify-center">
        <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md"
        onClick={(e)=>{
            e.preventDefault();
            var filteredclients = HandleFiltering(Condition,AllClients,UserInput);
            setFilteredClients(filteredclients);
            setUserHasSearched(true);
            
        }}
        
        >
          Search
        </button>
      </div>
    </div>
    {UserHasSearched && (
  <div className="mt-4 space-y-2">
    {FilteredClients.length > 0 ? (
      FilteredClients.map((client) => (
        <div
          key={client.id}
          onClick={(e) => {
            e.preventDefault();
            Navigate(`/search/${client.id}`);
          }} // Replace with real action
          className="cursor-pointer bg-gray-800 hover:bg-gray-700 p-4 rounded-lg transition duration-200 shadow-md"
        >
          <p className="text-lg font-semibold text-white">{client.name.String}</p>
          <p className="text-sm text-gray-300">{client.phone.String}</p>
          <p className="text-sm text-gray-400">{client.address.String}</p>
        </div>
      ))
    ) : (
      <div className="text-gray-400 text-center">No clients match your search.</div>
    )}
  </div>
)}
    </div>
  );
};

export default SearchClientsUpdate;
