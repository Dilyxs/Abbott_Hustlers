import React, { useEffect, useState } from 'react';
import { FetchAllFinanceDetails } from '../../utils/APIFunc';
import RecentData from '../components/Finances/RecentData';
import { HandleSelectDropdown } from '../components/Finances/HelperFu';
import AllData from '../components/Finances/AllData';
import IsLoadingCom from '../components/ClientView/IsLoadingCom';
import GeneralReturner from '../components/Finances/GeneralReturner';

const Finances = () => {
  const [viewType, setViewType] = useState('Recent');
  const [allFinanceDetails, setAllFinanceDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await FetchAllFinanceDetails();
      setAllFinanceDetails(response);
      setIsLoading(false);
    };
    getData();
  }, []);

  return (
    <div>
 
        {isLoading ? (
          <IsLoadingCom />
        ) : <GeneralReturner viewType= {viewType} setViewType = {setViewType} allFinanceDetails={allFinanceDetails} setAllFinanceDetails={setAllFinanceDetails}></GeneralReturner>}
      </div>
  );
};

export default Finances;
