import React from 'react';

const Address = ({ ClientInfo, HandleOnChange }) => {
  return (
    <div>
      <label htmlFor="address" className="block text-lg font-semibold">Address</label>
      <div className="flex items-center gap-2">
        <textarea
          type="text"
          name="address"
          id="address"
          placeholder="Enter Address"
          value={ClientInfo.address}
          onChange={(e) => HandleOnChange(e)}
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>
    </div>
  );
};

export default Address;
