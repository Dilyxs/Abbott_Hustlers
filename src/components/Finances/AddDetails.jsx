import React, { useState } from 'react'
import { AddDetailsButton, FormDataInput, ReloadAllData, SubmitData } from './HelperFu'

const AddDetails = ({ setAddedDetails, AddedDetails ,setAllFinanceDetails, setRecentDatas}) => {
  const [FormData, setFormData] = useState({ UserID: 3, Cost: 0, Context: "" });

  const handleSubmit = async () => {
    const successful = await SubmitData(FormData.UserID, FormData.Cost, FormData.Context);
    if (successful) {
      setFormData({ UserID: 3, Cost: 0, Context: "" });
      AddDetailsButton(setAddedDetails, false);
      const [response, filtered] = await ReloadAllData(true)
      setAllFinanceDetails(response);
      setRecentDatas(filtered);
    } else {
      alert("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Add Finance Details</h3>
          <button
            className="text-black-50 hover:cursor-pointer"
            onClick={() => AddDetailsButton(setAddedDetails, false)}
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">User ID (Required)</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 text-black-50"
              placeholder="Enter user ID"
              value={FormData.UserID}
              name='UserID'
              onChange={(e) => FormDataInput(e, setFormData)}
            />
            <p className='text-black-50'>(3: Adsayan, 20: Mario, 21: Hicham)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cost/Gain (Required)</label>
            <label className="block text-sm font-medium text-gray-700">Negative for Cost</label>
            <input
              type="number"
              step="0.01"
              className="w-full border border-gray-300 rounded-md p-2 mt-1  text-black-50"
              placeholder="Enter cost"
              name='Cost'
              value={FormData.Cost}
              onChange={(e) => FormDataInput(e, setFormData)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Context (Required)</label>
            <textarea
              rows="3"
              className="w-full border border-gray-300 rounded-md p-2 mt-1  text-black-50"
              placeholder="Enter context"
              value={FormData.Context}
              name='Context'
              onChange={(e) => FormDataInput(e, setFormData)}
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              onClick={() => AddDetailsButton(setAddedDetails, false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDetails;
