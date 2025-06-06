import React from "react";
import { onDeleteNoRecent } from "./HelperFu";

const USER_MAP = {
  3: "Adsayan",
  20: "Mario",
  21: "Hicham",
};

const AllData = ({ allFinanceDetails, setAllFinanceDetails }) => {
  if (!allFinanceDetails || Object.keys(allFinanceDetails).length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        <p>No current data</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-4 min-h-screen">
      <table className="min-w-full bg-white shadow rounded-md text-sm table-fixed">
        <thead className="bg-gray-100 text-gray-700 text-left">
          <tr>
            <th className="p-3 w-1/6">User</th>
            <th className="p-3 w-1/6">Cost</th>
            <th className="p-3 w-1/2">Context</th>
            <th className="p-3 text-center w-1/6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(allFinanceDetails).map((data) => (
            <tr key={data.id} className="border-t hover:bg-gray-50 transition-colors">
              <td className="p-3 text-gray-800">{USER_MAP[data.userid] || `User ${data.userid}`}</td>
              <td className="p-3 text-gray-800">{data.cost}</td>
              <td className="p-3 text-gray-600">{data.context}</td>
              <td className="p-3 flex justify-center">
                <button
                  onClick={() => onDeleteNoRecent(data.id, setAllFinanceDetails)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllData;
