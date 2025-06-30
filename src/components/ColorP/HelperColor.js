import { FetchColorData } from "../../../utils/APIFunc"

const ReturnData = async(typeData, color, opacity)=>{
    const response = await FetchColorData(typeData,color,opacity);
    if (response.status == 200){
        return response.data
    }
}