import { context } from "@react-three/fiber";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";

const base_url = import.meta.env.VITE_BASE_URL
export const PostClient = async (data) =>{

    try {
        const response = await axios.post(`${base_url}/ClientAddition`, data,{
            headers: {
                'Content-Type': 'application/json'
              }
        } );
        return response.data;
        
    } catch (error) {
        console.error("ran into Post error as ", error);
        throw error;
    }

};

export const GetAllClient = async() =>{
    try {
        const response =await axios.get(`${base_url}/AllClient`, {
            headers:{
                 'Content-Type': 'application/json'
            }

        });
        return response.data;
    } catch (error) {
        console.error("error  ing data as", error);
        return error

    }
};



export const NavigatePages = (path)=>{
  const navigate = useNavigate();
  navigate(`${path}`);

};

export const GetCurrentAddress = async(Lat, Long) =>{

  try {
    const response = await axios.post(`${base_url}/MapsAddress`, {Lat:String(Lat), Long:String(Long)},  {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
    
  } catch (error) {
    console.log("ran into error as", error)
    throw error
  }
  
}

export const RegisterUser = async (email , password)=>{
  const response = await axios.post(`${base_url}/Register`, {email:email, password:password});

  if (response.status == 200){
    return "ok"
  }else{
    return "error, Email already used"
  }
}
 

export const LoginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${base_url}/Login`,
      { email, password },
      { withCredentials: true }
    );

    if (response.status === 200) {
      return ["ok",response.data];  //you need call a helper function that uhh makes the token -> inserttoken return token that was generated, response.data gives userid 3 for example!
    } else {
      return "error, Unexpected server response";
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        return "error, Incorrect email or password";
      }
      else {
        return `error, ${error.response.statusText}`;
      }
    } else {
      return "error, Network or server issue";
    }
  }
};


export const Iscookied = async ()=>{
  const response = await axios.get(`${base_url}/isCookie`, {withCredentials:true});
  if (response.status == 200){
    return [true,response.data.id]
  }else(
    [false,nil]
  )
};

export const GetUserData = async(id)=>{
  const response = await axios.post(`${base_url}/userinformation`,{id:Number(id)}, {withCredentials:true})
  if (response.status == 200){
    return JSON.parse(response.data)
  }else
  return null
}


export const PostCalendarInfo = async (starttime, endtime, message, clientrelation) => {
  try {
    const response = await axios.post(
      `${base_url}/AddCalendarInfo`,
      {
        starttime,
        endtime,
        message,
        clientrelation,
      },
      { withCredentials: true }
    );

    if (response.status === 200) {
      return { status: 'ok', data: response.data };
    } else {
      return { status: 'error', message: 'Unexpected status code'};
    }
  } catch (error) {
    console.error('PostCalendarInfo error:', error);
    return { status: 'error', message: error.message || 'Request failed' };
  }
};

export const FetchCalendarData = async()=>{
  try {
      const response = await axios.get(  `${base_url}/CalendarInfo`, {headers:
    {'Content-Type': 'application/json'}
  })
  return (response).data
  } catch (error) {
    console.error("could not fetch CalendarData as", error)
    return null
    
  }
}

export const ToolTipBuilder = (clients, id) => {
  return clients.find((client) => client.id === id);
};


export const UpdateCalendarData = async () => {
    const response = await FetchCalendarData(); // response.data assumed
    const clients = await GetAllClient();       // wait for actual data

    const FormattedData = response.map((each) => {
      const correct_client = ToolTipBuilder(clients, each.clientrelation);
      console.log(correct_client);
      return {
        id: each.id,
        text: each.message,
        start: each.starttime,
        end: each.endtime,
        toolTip: correct_client
          ? `Name: ${correct_client.name.String}\n
        Phone: ${correct_client.phone.String}\n
        Address: ${correct_client.address.String}\n
        Message: ${correct_client.message.String || "None"}\n`
          : "Unknown client"
      };
    });

    return(FormattedData);
  };
export const DeleteACalendarEvent = async(id)=>{
  try {
    const response = await axios.delete(`${base_url}/deletecalendarevent`, { data: { id: id } });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return "err";
  }
};

export const GetASingleEvent = async (id) => {
  try {
    const response = await axios.post(`${base_url}/singleclient`, { id: Number(id) });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data?.error === "no rows in result set") {
      return "no existance";
    } else {
      console.error("Unexpected error in GetASingleEvent:", error);
      throw error; 
    }
  }
};

export const GetAllNotes = async () => {
  try {
    const response = await axios.get(`${base_url}/allnote`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const PostANote = async (Title, Detail, ClientRelation) => {
  try {
    const response = await axios.post(`${base_url}/postnote`, {
      title: Title,
      detail: Detail,
      clientrelation: Number(ClientRelation)
    });
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const DeleteANote = async (id) => {
  try {
    const response = await axios.delete(`${base_url}/deletenote`, {
      data: { id: Number(id) }
    });
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const UpdateANote = async (Id, Title, Detail, ClientRelation) => {
  try {
    const response = await axios.put(`${base_url}/updatenote`, {
      id: Number(Id),
      title: Title,
      detail: Detail,
      clientrelation: Number(ClientRelation)
    });
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const FetchAllFinanceDetails = async () => {
  try {
    const response = await axios.get(`${base_url}/getfinance`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const InsertAFinanceDetail = async (userid, cost, context) => {
  try {
    const response = await axios.post(`${base_url}/postfinance`, {
      userid: Number(userid),
      cost: Number(cost),
      context: String(context)
    });
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const DeleteAFinanceDetail = async (id) => {
  try {
    const response = await axios.delete(`${base_url}/deletefinance`, {
      data: { id: Number(id) }
    });
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const ChangeHasBeenTakenFinanceDetails = async (ids) => {
  try {
    const response = await axios.post(`${base_url}/changefinance`, {
      ids: ids
    });
    return response.status;
  } catch (error) {
    throw error;
  }
};

export const UploadImageToDB = async (url , title, description)=>{
  try {
    const response = await axios.post(`${base_url}/insertimage`,{url:url,title:title,description:description})
    return response.status
    
  } catch (error) {
    throw error;
  }
}

export const FetchAllImageData = async()=>{
  try {
    const response = await axios.get(`${base_url}/ImageData`)
    return response.data
  } catch (error) {
    throw error;
    
  }
}