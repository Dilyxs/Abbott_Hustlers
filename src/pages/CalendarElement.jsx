import React, { useEffect, useState } from 'react';
import { DeleteACalendarEvent, GetAllClient, ToolTipBuilder, UpdateCalendarData } from '../../utils/APIFunc';
import { DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import AddCalendarEvent from '../components/Calendar/AddCalendarEvent';
import SearchClients from '../components/Calendar/SearchClients';
import Message from '../components/Calendar/Message';
import DeleteEvent from '../components/Calendar/DeleteEvent';

const CalendarElement = () => {


  const [modalData, setModalData] = useState(null);
  const [allClients, setAllClients] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [dataForApi, setDataForApi] = useState({
    starttime: "",
    endtime: "",
    message: "",
    clientrelation: ""
  });

  const [events, setEvents] = useState([]);
  const [viewType, setViewType] = useState(window.innerWidth<480? "Day":"Week");

  useEffect(() => {
    const fetchClients = async () => {
      const result = await GetAllClient();
      setAllClients(result);
    };
    fetchClients();
  }, []);





useEffect(() => {const Quicky = async()=>{
  var Data = await UpdateCalendarData()
  setEvents(Data)
}
Quicky();

}
, []);

  return (
<div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
  <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[calc(100vh-3rem)]">
    {/* Sidebar */}
    <div className="w-full lg:w-1/3 flex flex-col gap-4 overflow-auto">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-2 pt-[20px]">
        <DayPilotNavigator
          selectMode="Week"
          showMonths={1}
          skipMonths={1}
          onTimeRangeSelected={(args) => setStartDate(args.day)}
          className="bg-gray-200 rounded-lg shadow-md p-0.5 w-full sm:w-auto "
        />
        <AddCalendarEvent
          setDataForApi={setDataForApi}
          DataForApi={dataForApi}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Message
          setDataForApi={setDataForApi}
          DataForApi={dataForApi}
          setEvents={setEvents}
        />
        <SearchClients
          AllClient={allClients}
          setDataForApi={setDataForApi}
          DataForApi={dataForApi}
        />
      </div>
    </div>

    {/* Calendar */}
    <div className="w-full lg:w-2/3 flex flex-col h-auto lg:h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
        <h2 className="text-xl font-semibold">Calendar</h2>
        <select
          value={viewType}
          onChange={(e) => setViewType(e.target.value)}
          className="bg-gray-700 text-white rounded px-2 py-1"
        >
          <option value="Day">Day</option>
          <option value="Week">Week</option>
        </select>
      </div>

      <div className="flex-1 bg-gray-800 rounded-lg shadow-md min-h-[400px] pt-0.5 m-3">
        <DayPilotCalendar
          viewType={viewType}
          events={events}
          startDate={startDate}
          onEventClick={(args) => setModalData(args.e.data)}
          dayBeginsHour={8}
          dayEndsHour={20}
          durationBarVisible={false}
        />
      </div>
    </div>
  </div>

  {/* Modal */}
  {modalData && (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-lg p-6 max-w-sm w-full shadow-xl">
        <h2 className="text-xl font-bold mb-2">{modalData.text}</h2>
        <p className="text-sm mb-4">
          {modalData.toolTip || "No additional info available"}
        </p>
        <button
          onClick={() => setModalData(null)}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Close
        </button>
        <div className='pt-[6px]'>
        <button className='w-full bg-red-300 hover:bg-red-500 text-black py-2 px-4 rounded-lg hover:cursor-pointer pt-2'
        onClick={async (e) => {
          e.preventDefault();

          try {
            const response = await DeleteACalendarEvent(modalData.id);

            if (response.message !== "ok") {
              alert("Error – Let Adsayan know about this.");
              return;
            }

            setModalData(null);

            const data = await UpdateCalendarData();
            setEvents(data);
          } catch (error) {
            console.error("Error deleting calendar event:", error);
            alert("Unexpected error – contact Adsayan.");
          }
        }}
        >
          Delete this Event?
        </button>
        </div>
        
      </div>
      
    </div>
  )}
</div>
  );
};

export default CalendarElement;
