import { useState, useEffect } from "react";
import { GetAllClient } from "../../utils/APIFunc";




const DashBoard = ({ id }) => {
  const [clientData, setClientData] = useState([]);

  useEffect(() => {
    const grabData = async () => {
      const response = await GetAllClient();
      setClientData(response);
    };

    grabData();
  }, []);

  return (
    <div>
      {clientData.map((client) => (
        <div key={client.id}>hi</div>
      ))}
      User ID: {id}
    </div>
  );
};

export default DashBoard;