import React, { useState } from 'react';

const ClientSpecific = ({ Client }) => {
  const CurrentDate = new Date().toISOString();

  const [ClientData, setClientData] = useState({
    id: Client.id,
    name: Client.name?.String || "",
    phone: Client.phone?.String || "",
    address: Client.address?.String || "",
    message: Client.message?.String || "",
    callweek: Client.callweek?.Time === "1970-01-01T00:00:00Z" ? CurrentDate : Client.callweek?.Time,
    highvalue: Client.highvalue?.Bool ?? false,
    bookingdone: Client.bookingdone?.Bool ?? false,
    bookingdate: Client.bookingdate?.Time === "1970-01-01T00:00:00Z" ? CurrentDate : Client.bookingdate?.Time,
    signed: Client.signed?.Bool ?? false,
    signedprice: Client.signedprice?.String || "",
    workdate: Client.workdate?.Time === "1970-01-01T00:00:00Z" ? CurrentDate : Client.workdate?.Time,
    leaduser: Client.leaduser?.Int64 || 3,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setClientData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <form>
      <div>
        <label>ID (immutable): </label>
        <span>{ClientData.id}</span>
      </div>

      <div>
        <label>Name: </label>
        <input type="text" name="name" value={ClientData.name} onChange={handleChange} />
      </div>

      <div>
        <label>Phone: </label>
        <input type="text" name="phone" value={ClientData.phone} onChange={handleChange} />
      </div>

      <div>
        <label>Address: </label>
        <input type="text" name="address" value={ClientData.address} onChange={handleChange} />
      </div>

      <div>
        <label>Message: </label>
        <textarea name="message" value={ClientData.message} onChange={handleChange} />
      </div>

      <div>
        <label>Call Week: </label>
        <input type="date" name="callweek" value={ClientData.callweek.split("T")[0]} onChange={handleChange} />
      </div>

      <div>
        <label>High Value: </label>
        <input type="checkbox" name="highvalue" checked={ClientData.highvalue} onChange={handleChange} />
      </div>

      <div>
        <label>Booking Done: </label>
        <input type="checkbox" name="bookingdone" checked={ClientData.bookingdone} onChange={handleChange} />
      </div>

      <div>
        <label>Booking Date: </label>
        <input type="date" name="bookingdate" value={ClientData.bookingdate.split("T")[0]} onChange={handleChange} />
      </div>

      <div>
        <label>Signed: </label>
        <input type="checkbox" name="signed" checked={ClientData.signed} onChange={handleChange} />
      </div>

      <div>
        <label>Signed Price: </label>
        <input type="text" name="signedprice" value={ClientData.signedprice} onChange={handleChange} />
      </div>

      <div>
        <label>Work Date: </label>
        <input type="date" name="workdate" value={ClientData.workdate.split("T")[0]} onChange={handleChange} />
      </div>

      <div>
        <label>Lead User (ID): </label>
        <input type="number" value={ClientData.leaduser} readOnly />
      </div>
    </form>
  );
};

export default ClientSpecific;
