import React from 'react'

const DeleteEvent = () => {
  return (

    <div className="bg-gray-800 p-4 rounded-lg shadow-lg space-y-4">
      <h3 className="text-xl font-semibold text-white">Message</h3>
      
      <textarea
        placeholder="Type your message here..."
        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        name="message"
        rows="2"
      />
     <button
  className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
>
  Add Event
</button>
      </div>
  )
}

export default DeleteEvent