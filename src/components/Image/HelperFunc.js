import axios from "axios";
import { FetchAllImageData, UploadImageToDB } from "../../../utils/APIFunc";
import imageCompression from 'browser-image-compression';


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
    var WebFile = await convertToWebP(file)
    var ReducedFile = await LowerFileSize(WebFile)
    const data = new FormData();
    data.append('file', ReducedFile);
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

export const LowerFileSize = async (file)=>{
    var ReducedFile = await imageCompression(file,{maxSizeMB:0.5, maxWidthOrHeight:720});
    return ReducedFile
}


export const convertToWebP = (file, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const webpFile = new File([blob], file.name.replace(/\.\w+$/, ".webp"), {
              type: "image/webp",
              lastModified: Date.now(),
            });
            resolve(webpFile);
          } else {
            reject("Conversion to WebP failed.");
          }
        },
        "image/webp",
        quality // 0.0 - 1.0
      );
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};



export const authFlow = () => {
      const stored = JSON.parse(localStorage.getItem('Token')) || null;
      if (stored){
        return true
      }else{
        return false
      }}