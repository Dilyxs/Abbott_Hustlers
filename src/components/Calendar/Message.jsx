import React from 'react'
import {PostCalendarInfo, UpdateCalendarData} from '../../../utils/APIFunc'


const Message = ({setDataForApi, DataForApi, setEvents}) => {

  const HandleSubmission = (e)=>{
    e.preventDefault();
    const DataProj = async()=>{
      console.log(DataForApi)
      const originalStarttime = new Date(DataForApi.starttime);
      const originalEndtime = new Date(DataForApi.endtime);

      // Shift both start and end times back by 4 hours
      const shiftedStarttime = new Date(originalStarttime.getTime() - 4 * 60 * 60 * 1000).toISOString();
      const shiftedEndtime = new Date(originalEndtime.getTime() - 4 * 60 * 60 * 1000).toISOString();

      const { status, _ } = await PostCalendarInfo(
        shiftedStarttime,
        shiftedEndtime,
        DataForApi.message,
        DataForApi.clientrelation
      );
      if (status=="ok"){
        alert("succesful")
        setDataForApi({
    starttime: "",
    endtime: "",
    message: "",
    clientrelation: ""
  })
      }else{
        alert("error, let Adsayan know what's up, cannot insert an event")
      }//part 2
      var data = await UpdateCalendarData()
      setEvents(data);

        
    }
    DataProj();
    
  }


  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg space-y-4">
      <h3 className="text-xl font-semibold text-white">Message</h3>
      
      <textarea
        value={DataForApi.message}
        onChange={(e)=>{setDataForApi((prev)=>({...prev, [e.target.name]:e.target.value}))}}
        placeholder="Type your message here..."
        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        name="message"
        rows="10"
      />
     <button
  className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
  onClick={(e)=>HandleSubmission(e)}
>
  Add Event
</button>
      </div>
  )
}

export default Message