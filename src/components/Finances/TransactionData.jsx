import React from 'react';
import { AlterAllRelatedEvents } from './HelperFu';

const TransactionData = ({ Transactions, setShowTransactions,setAllFinanceDetails, setRecentDatas,SelectedData,setSelectedData}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Transactions</h3>
          <button
            onClick={() => setShowTransactions(false)}
            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
          >
            Close
          </button>
        </div>

        {Transactions.length === 0 ? (
          <p className="text-gray-500 text-sm">No transactions to show.</p>
        ) : (
          <ul className="space-y-2">
            {Transactions.map((tx, index) => (
              <li
                key={index}
                className="bg-gray-100 p-3 rounded-md text-gray-800"
              >
                <strong>{tx.from}</strong> sends <strong>${tx.amount.toFixed(2)}</strong> to <strong>{tx.to}</strong>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-12 flex justify-center">
            <div className="bg-red-500 text-white px-6 py-4 rounded-xl shadow-md">
                <button className="hover:bg-red-600 transition-colors font-semibold text-sm hover:cursor-pointer"
                onClick={(e)=>{AlterAllRelatedEvents(setAllFinanceDetails,setRecentDatas,SelectedData,setSelectedData, setShowTransactions)}}>
                Have the items been processed? (Money sent?)
                </button>
            </div>
            </div>
      </div>
    </div>
  );
};

export default TransactionData;

