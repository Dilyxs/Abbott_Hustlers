import React, { useState } from 'react';//add later -> when button is clicked -> the blue clicked button changes

const SearchClients = ({ AllClient, setDataForApi , DataForApi}) => {
  const [PossibleClients, setPossibleClients] = useState(AllClient);
  const [UserInput, setUserInput] = useState('');
  const [SelectedClientId, setSelectedClientId] = useState(null);

  const HandleSearch = (e) => {
    const input = e.target.value;
    setUserInput(input);
    const filtered = AllClient.filter((client) =>
      client.name.String.toLowerCase().includes(input.toLowerCase())
    );
    setPossibleClients(filtered);
  };

  return (
    <div className="flex bg-gray-900 text-white h-[400px]">
      {/* Sidebar Panel */}
      <div className="w-80 bg-gray-800 p-4 border-r border-gray-700 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Search Clients</h2>
        <input
          type="text"
          placeholder="Enter Client Name"
          className="w-full p-2 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={HandleSearch}
          value={UserInput}
        />

        <div className="mt-4 space-y-2 overflow-y-auto max-h-[calc(40vh-15px)]">
          {PossibleClients.slice(0, 10).map((client) => {
            const isSelected = SelectedClientId === client.id;
           return (
  <button
    key={client.phone.String}
    type="button"
    className={`w-full text-left p-3 rounded-lg transition-all shadow-sm ${
      isSelected ? 'bg-blue-700' : 'bg-gray-700 hover:bg-blue-600'
    }`}
    onClick={() => {
      console.log(client.id)
      setSelectedClientId(client.id);
      setDataForApi((prev) => ({
        ...prev,
        clientrelation: client.id,
      }));
    }}
  >
    <p className="font-semibold text-white">{client.name.String}</p>
    <p className="text-sm text-gray-300">{client.address.String}</p>
  </button>
);

          })}
        </div>
        <div> Current Client Selected id is: {DataForApi.clientrelation}</div>
      </div>
    </div>
  );
};

export default SearchClients;
