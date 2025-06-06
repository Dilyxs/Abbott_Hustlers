import React, { useEffect, useState } from 'react'
import { GetAllClient } from '../../utils/APIFunc';
import SearchClientsUpdate from '../components/Search/SearchClientsUpdate';

const SearchQuery = () => {
    const [AllClients , setAllClients ] = useState([]);
    useEffect(()=>{
    const fetchClients = async () => {
        const result = await GetAllClient();
        setAllClients(result);
    };
    fetchClients();
    }, []);
  return (
    <SearchClientsUpdate AllClients={AllClients}></SearchClientsUpdate>
  )
}

export default SearchQuery