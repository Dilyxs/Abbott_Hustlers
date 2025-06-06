import React, { useEffect, useState } from 'react'
import SingleNote from '../components/NotesElement/SingleNote'
import { GetAllClient, GetAllNotes } from '../../utils/APIFunc';
import IsLoadingCom from '../components/ClientView/IsLoadingCom';

const Notes = () => {
    const [AllNotes , setAllNotes ] = useState([]);
    const [isLoading , setIsLoading ] = useState(true);
    const [AllClients , setAllClients ] = useState([]);
    useEffect(()=>{
        const FetchAllData = async () => {
            const response = await GetAllNotes();
            setAllNotes(response)
            const clients_data = await GetAllClient();
            setAllClients(clients_data)
        }
        FetchAllData();
        setIsLoading(false);
    },[])


  return (
    <div>
        {isLoading? <IsLoadingCom></IsLoadingCom>:<SingleNote AllNotes={AllNotes} AllClients={AllClients} setAllNotes={setAllNotes}></SingleNote>}
    </div>
  )
}

export default Notes