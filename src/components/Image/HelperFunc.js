import axios from "axios";
import { FetchAllImageData, UploadImageToDB } from "../../../utils/APIFunc";

export const HandleChange = (e,SetFormData)=>{
    e.preventDefault();
    if (e.target.type != "file"){
        SetFormData((prev)=>({...prev, [e.target.name]:e.target.value}))
    }else{
      SetFormData((prev)=>({...prev, [e.target.name]:e.target.files[0]}))   
    }

}   

export const HandleSubmitFormData = async (e,FormData,setFormData,setAddImage,AddImage)=>{
    e.preventDefault()
    console.log(FormData)
    //do api submission or something
    var url = await HandleFileDownload(FormData.image)

    if (url === null){
        alert("error contact adsayan")
    }
    var status = await UploadImageToDB(url,FormData.title, FormData.description)
    if (status != "200"){ alert("error contact adsayan")}
    else
    {setAddImage(!AddImage)
    setFormData({"image":"","title":"","description":""})
    localStorage.setItem("FormData", JSON.stringify({"image":"","title":"","description":""}))
    }

    }


export const HandleFileDownload = async (file)=>{
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'React_Upload');//I assume React_Upload is the only requirement I need to input???

try {
    var result = await axios.post('https://api.cloudinary.com/v1_1/deovzwlfm/auto/upload',data)
    return result.data.secure_url
} catch (error) {
    return null
}

}

export const LoadAllImages = async()=>{
    try {
        const response = await FetchAllImageData()
        return response
    } catch (error) {
        console.log("error with backend")
        
    }
}