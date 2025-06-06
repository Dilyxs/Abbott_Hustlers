import React from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import './datetime-dark.css'; 
import moment from 'moment'

const AddCalendarEvent = ({ setDataForApi, DataForApi }) => {
  const handleDateChange = (name, value) => {
    if (moment.isMoment(value)) {
      const isoString = value.toISOString();
      setDataForApi((prev) => ({
        ...prev,
        [name]: isoString,
      }));
    }
  };

  return (
    <div className="bg-gray-900 text-white h-auto w-[300px] p-4">
      <div className="bg-gray-800 p-4 rounded-lg w-full max-w-md border-b border-t border-gray-700 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Insert a New Event</h2>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Start Date & Time</label>
          <Datetime
            value={DataForApi.starttime ? moment(DataForApi.starttime) : ''}
            onChange={(val) => handleDateChange('starttime', val)}
            inputProps={{
  style: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '8px',
    backgroundColor: '#374151', // equivalent to bg-gray-700
    border: '1px solid #4B5563', // equivalent to border-gray-600
    color: '#FFFFFF', // white text for dark background
    outline: 'none',
  },
}}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">End Date & Time</label>
          <Datetime
            value={DataForApi.endtime ? moment(DataForApi.endtime) : ''}
            onChange={(val) => handleDateChange('endtime', val)}
            inputProps={{
  style: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '8px',
    backgroundColor: '#374151', // equivalent to bg-gray-700
    border: '1px solid #4B5563', // equivalent to border-gray-600
    color: '#FFFFFF', // white text for dark background
    outline: 'none',
  },
}}
          />
        </div>
      </div>
    </div>
  );
};

export default AddCalendarEvent;
