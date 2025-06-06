import { ChangeHasBeenTakenFinanceDetails, DeleteAFinanceDetail, InsertAFinanceDetail } from "../../../utils/APIFunc"
import { FetchAllFinanceDetails } from "../../../utils/APIFunc"

export const HandleSelectDropdown = (e, setViewType)=>{
    setViewType(e.target.value)
}
export const FilterFiances = (data) =>{
    console.log(data)
    if (data.length > 0){return data.filter((dataSingle)=>(!dataSingle.hasbeentaken))}else{return data}
    
}

export const AddDetailsButton = (setAddedDetails, clicked = true)=>{
    setAddedDetails(clicked)
}

export const FormDataInput = (e, setAddedDetails)=>{setAddedDetails((prev)=>({...prev, [e.target.name]:e.target.value}))}

export const SubmitData = async(userid,cost,context)=>{
    const response = await InsertAFinanceDetail(userid, cost,context)

    if (response == "200"){
        return true
    }else{
        return false
    }
}

export const ReloadAllData = async (filtered=true) => {
    const response = await FetchAllFinanceDetails();
    if (filtered){
        return[response,FilterFiances(response)]
    }else{
        return [response,null]
    }
}

export const onDelete = async(id, setAllFinanceDetails, setRecentData)=>{
    const response = await DeleteAFinanceDetail(id)
    if (response =="200"){
        const [response, filtered] = await ReloadAllData(true)
        setAllFinanceDetails(response)
        setRecentData(filtered)

    }else{
        alert("errorr deleting event contact Adsayan")
    }
}

export const onDeleteNoRecent = async (id, setAllFinanceDetails) => {
     const response = await DeleteAFinanceDetail(id)
    if (response =="200"){
        const [response, _] = await ReloadAllData(true)
        setAllFinanceDetails(response)

    }else{
        alert("errorr deleting event contact Adsayan")
    }
    
}


export const HandleSperation = (data)=>{
    const USER_MAP = [
    [3,'Adsayan',0],
    [20,'Mario',0],
    [21,'Hicham',0]
    ];
    data.forEach(element => {
        switch (element.userid){
            case 3:
                USER_MAP[0][2] += element.cost
                break

            case 20:
                USER_MAP[1][2] += element.cost
                break
            
            default:
                USER_MAP[2][2] += element.cost
                break
        }
        
    });
    return USER_MAP;
}

export const settleDebts = (partnerBalances)=> {
  // partnerBalances: array of { name: string, delta: number }

  const payers = [];
  const receivers = [];

  for (const person of partnerBalances) {
    if (person.delta > 0) {
      payers.push({ name: person.name, amount: person.delta });
    } else if (person.delta < 0) {
      receivers.push({ name: person.name, amount: -person.delta }); 
    }
  }

  payers.sort((a, b) => b.amount - a.amount);
  receivers.sort((a, b) => b.amount - a.amount);

  const transactions = [];

  let i = 0, j = 0;

  while (i < payers.length && j < receivers.length) {
    const payer = payers[i];
    const receiver = receivers[j];
    const transfer = Math.min(payer.amount, receiver.amount);

    transactions.push({
      from: payer.name,
      to: receiver.name,
      amount: transfer
    });

    payer.amount -= transfer;
    receiver.amount -= transfer;

    if (payer.amount === 0) i++;
    if (receiver.amount === 0) j++;
  }

  return transactions;
}

export const ConnTransfer = (data)=>{
    var mapping = HandleSperation(data)
    var i = 0
    var sum = 0
    while(i<mapping.length){
        var p_l =mapping[i][2]
        sum+= p_l
        i++
    }

    var required_format = mapping.map((data)=>({name:data[1], delta:data[2]-(sum/mapping.length)}))
    var transactions = settleDebts(required_format)
    console.log("Transactions:");
    transactions.forEach(tx => {
    console.log(`${tx.from} sends $${tx.amount} to ${tx.to}`);
    });
    return transactions

}


export const AlterAllRelatedEvents = async (setAllFinanceDetails,setRecentDatas,SelectedData, setSelectedData,setShowTransactions) =>{
    var ids = SelectedData.map((transaction)=>(transaction.id))
    const response = await ChangeHasBeenTakenFinanceDetails(ids)
    setSelectedData([]);
    if (response == "200"){
         const [response, filtered] = await ReloadAllData(true)
        setAllFinanceDetails(response)
        setRecentDatas(filtered)
    }
    setShowTransactions(false)
}