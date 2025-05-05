import React, { useState, useEffect } from 'react';
import Address from '../components/Form/Address';
//to do later refractor code so that things are more readable especially inside the form add a toast after click button also
import axios from 'axios';
const AddClient = () => {
  const [ClientInfo, setClientInfo] = useState({
    name: "",
    phone: "",
    address: "",
    message: "",
    callweek: '',
    highvalue: false,
    bookingdone: false,
    bookingdate: '',
    signed: false, 
    signedprice: "",
    workdate: '',
    leaduser:3
  });

  useEffect(() => {
    localStorage.setItem("clientForm", JSON.stringify(ClientInfo));
  }, [ClientInfo]);
  
  // Restore on mount
  useEffect(() => {
    const saved = localStorage.getItem("clientForm");
    if (saved) {
      setClientInfo(JSON.parse(saved));
    }
  }, []);

  const HandleOnChange = (e) => {
    const { type, name, value, checked } = e.target;
    type==="checkbox"? null:e.preventDefault()

    setClientInfo((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
  
    // Create a fresh copy with fallbacks applied
    const correctedClientInfo = {
      ...ClientInfo,
      bookingdate: ClientInfo.bookingdate || "1970-01-01",
      callweek: ClientInfo.callweek || "1970-01-01",
      workdate: ClientInfo.workdate || "1970-01-01",
    };
  
    // Submit using the corrected version
    axios.post("http://127.0.0.1:4330/ClientAddition", correctedClientInfo, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    console.log(correctedClientInfo); // correct!
  
    alert("User submitted");
  
    // Reset form
    setClientInfo({
      name: "",
      phone: "",
      address: "",
      message: "",
      callweek: '',
      highvalue: false, 
      bookingdone: false, 
      bookingdate: '',
      signed: false,
      signedprice: "",
      workdate: '',
      leaduser: 3
    });
  };
  return (
    <div className="max-w-2xl mx-auto p-6  rounded-lg shadow-md">
      <form onSubmit={(e) => HandleSubmit(e)}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg font-semibold">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              value={ClientInfo.name}
              onChange={(e) => HandleOnChange(e)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-lg font-semibold">Phone</label>
            <div className='flex items-center gap-2'>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter Phone"
              value={ClientInfo.phone}
              onChange={(e) => HandleOnChange(e)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></input>
            <img src="/images/copy.svg" className="w-6 h-6 cursor-pointer hover:bg-amber-300" 
            onClick={async (e)=>{
              e.preventDefault();
               await navigator.clipboard.writeText(ClientInfo.phone);
               }}/>
            </div>
          </div>

          <Address ClientInfo={ClientInfo} HandleOnChange={HandleOnChange}></Address>

          <div>
            <label htmlFor="message" className="block text-lg font-semibold">Message</label>
            <input
              type="text"
              name="message"
              id="message"
              placeholder="Enter Message"
              value={ClientInfo.message}
              onChange={(e) => HandleOnChange(e)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="callweek" className="block text-lg font-semibold">Call Week</label>
            <input
              type="date"
              name="callweek"
              id="callweek"
              value={ClientInfo.callweek ?? ""}
              onChange={(e) => HandleOnChange(e)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="highvalue"
                id="highvalue"
                checked={ClientInfo.highvalue}
                onChange={(e) => HandleOnChange(e)}
                className="h-5 w-5 text-blue-600 hover:text-red-500"
              />
              <label htmlFor="highvalue" className="ml-2 text-lg font-semibold">500$++ client?</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="bookingdone"
                id="bookingdone"
                checked={ClientInfo.bookingdone}
                onChange={(e) => HandleOnChange(e)}
                className="h-5 w-5 text-blue-600"
              />
              <label htmlFor="bookingdone" className="ml-2 text-lg font-semibold">Booking Done</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="signed"
                id="signed"
                checked={ClientInfo.signed}
                onChange={(e) => HandleOnChange(e)}
                className="h-5 w-5 text-blue-600"
              />
              <label htmlFor="signed" className="ml-2 text-lg font-semibold">Signed</label>
            </div>
          </div>
          <div>
            <label htmlFor="callweek" className="block text-lg font-semibold">Booking Date</label>
            <input
              type="date"
              name="bookingdate"
              id="bookingdate"
              value={ClientInfo.bookingdate ?? ""}
              onChange={(e) => HandleOnChange(e)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="signedprice" className="block text-lg font-semibold">Signed Price</label>
            <input
              type="number"
              name="signedprice"
              id="signedprice"
              placeholder="Enter Signed Price"
              value={ClientInfo.signedprice ?? ""}
              onChange={(e) => HandleOnChange(e)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="workdate" className="block text-lg font-semibold">Work Date</label>
            <input
              type="date"
              name="workdate"
              id="workdate"
              value={ClientInfo.workdate ?? ""}
              onChange={(e) => HandleOnChange(e)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="leaduser" className="block text-lg font-semibold">LeadUser</label>
            <input
              type="text"
              name="leaduser"
              id="leaduser"
              placeholder="Lead User?"
              value={ClientInfo.leaduser}
              onChange={(e) => HandleOnChange(e)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        
        </div>
      </form>
    </div>
  );
};

export default AddClient;
