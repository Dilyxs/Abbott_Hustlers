import React, { useState, useEffect } from 'react';
import Address from '../components/Form/Address';
import { PostClient } from '../../utils/APIFunc';
const AddClient = () => {
  const [AddressGrabber, setAddressGrabber] = useState(false);


    const [ClientInfo, setClientInfo] = useState(() => {
      const saved = localStorage.getItem("clientForm");
      return saved
        ? JSON.parse(saved)
        : {
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
            leaduser:String(JSON.parse(localStorage.getItem("Token"))['userid'])
          };
    });

    useEffect(() => {
      const saveBeforeUnload = () => {
        localStorage.setItem("clientForm", JSON.stringify(ClientInfo));
      };

      window.addEventListener("pagehide", saveBeforeUnload);
      return () => window.removeEventListener("pagehide", saveBeforeUnload);
    }, [ClientInfo]);

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
    const correctedClientInfo = {
      ...ClientInfo,
      bookingdate: ClientInfo.bookingdate || "1970-01-01",
      callweek: ClientInfo.callweek || "1970-01-01",
      workdate: ClientInfo.workdate || "1970-01-01",
      leaduser:Number(JSON.parse(localStorage.getItem("Token"))['userid'])
    };

    const quicky = async()=>{
      try {
        console.log(correctedClientInfo)
        const data = await PostClient(correctedClientInfo); console.log(data)
        alert("User submitted");
        localStorage.removeItem("clientForm");
            
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
      leaduser: Number(JSON.parse(localStorage.getItem("Token"))['userid'])
      });
      console.log(correctedClientInfo); 
      } catch (error) {
        alert("User not submitted. Do it Manually On Sheets")
      }
  
    };
    quicky();
  
  

  };

  const HandleRestart = ()=>{
    localStorage.removeItem("ClientInfo");
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
      leaduser:JSON.parse(localStorage.getItem("Token"))['userid']
      });

  }
  {console.log(ClientInfo)}
  {console.log(JSON.parse(localStorage.getItem("Token"))['userid'])}

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

          <Address ClientInfo={ClientInfo} HandleOnChange={HandleOnChange} setClientInfo={setClientInfo} ></Address>

          <div>
            <label htmlFor="message" className="block text-lg font-semibold">Message</label>
            <textarea
              type="text"
              name="message"
              rows={4}
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
      {AddressGrabber && 
        <div className="fixed bottom-0 left-0 w-full bg-purple-950 text-white text-center shadow-lg z-50 h-9px">
          <p className="">Getting Address Keep Filling Data!</p>
          
        </div>}
        <div className="p-4 w-full h-full">
  <button
    className="flex flex-col items-center justify-center gap-1 bg-white text-black px-4 py-2 rounded-xl hover:bg-red-400 active:scale-95 transition-all duration-150 shadow-md hover:cursor-pointer w-full"
    onClick={()=>HandleRestart()}
  >
    <label className="text-sm">Restart Client Info Manually</label>
    <span className="text-base font-semibold">Click me!</span>
  </button>
</div>
    </div>
  );
};

export default AddClient;
