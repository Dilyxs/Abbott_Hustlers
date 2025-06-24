import React, { useState } from 'react';
import { ConnTransfer, onDelete } from './HelperFu';
import TransactionData from './TransactionData';

const USER_MAP = {
  3: 'Adsayan',
  20: 'Mario',
  21: 'Hicham'
};

const RecentData = ({ RecentDatas, setAllFinanceDetails, setRecentDatas }) => {
  const [SelectedData, setSelectedData] = useState([]);
  const [ShowTransactions, setShowTransactions] = useState(false);
  const [Transactions, setTransactions] = useState(null);

  const onAdd = (data) => {
    console.log(SelectedData)
    if (!SelectedData.includes(data)) {
      setSelectedData((prev) => [...prev, data]);
    } else {
      const filtered = SelectedData.filter((item) => item !== data);
      setSelectedData(filtered);
    }
  };

  if (!RecentDatas) {
    return (
      <div className="p-6 text-center text-gray-600">
        <p>No current data</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-2 sm:p-4 min-h-screen">
      <table className="min-w-full bg-white shadow rounded-md text-sm sm:text-base table-fixed">
        <thead className="bg-gray-100 text-gray-700 text-left">
          <tr>
            <th className="p-2 sm:p-3 w-1/6">User</th>
            <th className="p-2 sm:p-3 w-1/6">Cost/Gain</th>
            <th className="hidden sm:table-cell p-2 sm:p-3 w-2/3 max-w-xs">Context</th>
            <th className="p-2 sm:p-3 text-center w-1/6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(RecentDatas).map((data) => (
            <tr key={data.id} className="border-t hover:bg-gray-50 transition-colors">
              <td className="p-2 sm:p-3 text-gray-700 truncate max-w-[6rem]" title={USER_MAP[data.userid] || `User ${data.userid}`}>
                {USER_MAP[data.userid] || `User ${data.userid}`}
              </td>
              <td className="p-2 sm:p-3 text-gray-700">{data.cost}</td>
              <td className="hidden sm:table-cell p-2 sm:p-3 text-gray-700 truncate max-w-xs" title={data.context}>
                {data.context}
              </td>
              <td className="p-2 sm:p-3 flex justify-center gap-2">
                <button
                  onClick={() => onDelete(data.id, setAllFinanceDetails, setRecentDatas)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition"
                >
                  Delete
                </button>
              </td>
              <td className="p-2 sm:p-3 flex justify-center">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={SelectedData.includes(data)}
                    onChange={() => onAdd(data)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 sm:w-11 sm:h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 relative transition-all">
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-4 sm:peer-checked:translate-x-5"></div>
                  </div>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8 sm:mt-12 flex flex-col items-center justify-center space-y-4 bg-white p-4 sm:p-6 rounded shadow-md max-w-sm mx-auto">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 text-center">
          Calculate Transactions
        </h2>
        <button
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 sm:p-4 shadow-lg transition"
          onClick={() => {
            const transactions = ConnTransfer(SelectedData);
            setTransactions(transactions);
            setShowTransactions(true);
          }}
          aria-label="Calculate Transactions"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 sm:h-8 sm:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="12" y1="10" x2="12" y2="18" />
            <line x1="8" y1="14" x2="16" y2="14" />
          </svg>
        </button>
      </div>

      {ShowTransactions && (
        <TransactionData
          Transactions={Transactions}
          setShowTransactions={setShowTransactions}
          setAllFinanceDetails={setAllFinanceDetails}
          setRecentDatas={setRecentDatas}
          SelectedData={SelectedData}
          setSelectedData={setSelectedData}
        />
      )}
    </div>
  );
};

export default RecentData;
