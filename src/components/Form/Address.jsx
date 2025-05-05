import React, {useState} from 'react'
import { GetAddress } from '../../../utils/APIFunc';
//maybe add fill-in address later as a feature

const Address = ({ClientInfo, HandleOnChange}) => {
        const [LatLong, setLatLong] = useState({
            latitude:"",
            longitude:""
        })

    const GetLatLog = async () => {
        const options = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0,
        };
        
        const getPosition = () =>
            new Promise((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject, options)
            );
        
        try {
            const pos = await getPosition();
            const crd = pos.coords;
        
            console.log("Your current position is:");
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
        
            //setLatLong({ latitude: crd.latitude, longitude: crd.longitude });
            console.log({ latitude: crd.latitude, longitude: crd.longitude }); 


            const result = await GetAddress(crd.latitude, crd.longitude);
            console.log(result);


        } catch (err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        };
        




  return (
    <div>
        <label htmlFor="address" className="block text-lg font-semibold">Address</label>
        <div className='flex items-center'>
        <input
            type="text"
            name="address"
            id="address"
            placeholder="Enter Address"
            value={ClientInfo.address}
            onChange={(e) => HandleOnChange(e)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <img src="/images/address.svg" className="w-6 h-6 cursor-pointer hover:bg-amber-300" 
            onClick={async (e)=>{
              e.preventDefault();}}/>
        </div>
        </div>
  )
}

export default Address