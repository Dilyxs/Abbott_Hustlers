import RecentData from './RecentData';
import { AddDetailsButton, HandleSelectDropdown } from './HelperFu';
import AllData from './AllData';
import { useState,useEffect } from 'react';
import AddDetails from './AddDetails';
import { FilterFiances } from './HelperFu';

const GeneralReturner = ({ viewType, setViewType, allFinanceDetails , setAllFinanceDetails}) => {
  const [AddedDetails , setAddedDetails ] = useState(false);
    const [RecentDatas , setRecentDatas ] = useState([]);
  useEffect(()=>{
    if(allFinanceDetails   != null){
      setRecentDatas( FilterFiances(allFinanceDetails))
    }else{
      setRecentDatas(allFinanceDetails)
    }
    
  },[])
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-white-800">Finances</h2>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        onClick={(e)=>AddDetailsButton(setAddedDetails,true)}
      >
        Add Details
      </button>
    </div>

      <div className="mb-6">
        <label
          htmlFor="viewType"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Data View Type:
        </label>
        <select
          id="viewType"
          value={viewType}
          onChange={(e) => HandleSelectDropdown(e, setViewType)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Recent">Recent</option>
          <option value="All">All</option>
        </select>
      </div>

      <div className="mt-4">
        {viewType === 'Recent' ? (
          <RecentData RecentDatas={RecentDatas} setAllFinanceDetails={setAllFinanceDetails} setRecentDatas={setRecentDatas}/>
        ) : (
          <AllData allFinanceDetails={allFinanceDetails}  setAllFinanceDetails={setAllFinanceDetails}/>
        )}
      </div>
      <div>
        {AddedDetails && (
           <AddDetails setAddedDetails={setAddedDetails} AddDedDetails={AddDetails} setAllFinanceDetails={setAllFinanceDetails} setRecentDatas={setRecentDatas}></AddDetails>
        )}
      </div>
    </div>
  );
};

export default GeneralReturner;
