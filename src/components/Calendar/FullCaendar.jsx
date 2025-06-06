// CalendarComponent.jsx
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

const CalendarComponent = () => {
    const api_key = import.meta.env.VITE_GOOGLECALENDAR_API
  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, googleCalendarPlugin]}
        initialView="dayGridMonth"
        googleCalendarApiKey={api_key}
        events={{
          googleCalendarId: 'selvan@adsayan.com',
        }}
        height="auto"
      />
    </div>
  );
};

export default CalendarComponent;
