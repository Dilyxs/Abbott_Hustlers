import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetAllClient, GetASingleEvent } from '../../../utils/APIFunc';
import { FindClientExistance } from './HelperFunc';
import ClientSpecific from './ClientSpecific';
import ClientAbsence from './ClientAbsence';
import IsLoadingCom from './IsLoadingCom';

const ClientDetails = () => {
    const { clientid } = useParams(); 
    const [ClientExistance, setClientExistance] = useState(false);
    const [Client , setClient ] = useState({});
    const [isLoading , setIsLoading ] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            const result = await GetASingleEvent(clientid);
            if (typeof result === 'object' && result!=null){
                return result
            }else{
                return "err"
            }
        };

        const checkClientExistance = async () => {
            setIsLoading(true)
            const result = await fetchClients();
            if(result !="err"){//no change
                setClientExistance(true);
                setClient(result)
            }
            setIsLoading(false);
        };

        checkClientExistance();

    }, [clientid]);

    return (
        <div>
            {isLoading? (<IsLoadingCom/>):ClientExistance ? (
                <ClientSpecific Client={Client} />
            ) : (
                <ClientAbsence />
            )}
        </div>
    );
};

export default ClientDetails;
