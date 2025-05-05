import React from 'react';

export const Clicked = ({ message }) => {
  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-md z-50">
      {message}
    </div>
  );
};
