import axios from "axios";
import { useNavigate } from "react-router-dom";

{/*app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders: "Content-Type, Accept",
	}))

	app.Get("/", utils.DashBoard) // see all clients veried and works

	app.Post("/ClientAddition/", utils.IntegrateClient) //create brand new clients works

	app.Put("/UpdateClient/", utils.UpdateClient) //Update a client works

	app.Post("/LoginVerification/", utils.VericationLogin) //used for verification

	app.Post("/DeleteClient/", utils.DeleteSingleClient) //delete a single client
*/

}
const base_url = "https://abbott.adsayan.com";
export const PostClient = async (data) =>{

    try {
        const response = await axios.post(`${base_url}/ClientAddition/`, data,{
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
        const response =await axios.get(`${base_url}/`, {
            headers:{
                 'Content-Type': 'application/json'
            }

        });
        return response.data;
    } catch (error) {
        console.error("error fetching data as", error);
        throw error;

    }
};

export const LoginVerificationAPI = async (username, password) => {
    try {
      const response = await axios.post(`${base_url}/LoginVerification/`, 
        {
          username: username,
          password: password
        }, 
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.log('Error fetching login info:', error);
      throw error;
    }
  };


export const NavigatePages = (path)=>{
  const navigate = useNavigate();
  navigate(`${path}`);

};

export const GetAddress = async (Lat, Long) =>{
  const api_data = import.meta.env.VITE_GEOLO;
  try {
    const response = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${Lat}&lon=${Long}&apiKey=${api_data}`)
    return response
  } catch (error) {
    console.log(`ran into err as ${error}`)
    throw error
  }
}