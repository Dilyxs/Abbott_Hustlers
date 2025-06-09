import React, { useEffect, useState } from 'react'
import SelectImage from '../components/Image/SelectImage'
import { LoadAllImages } from '../components/Image/HelperFunc';
import AllIages from '../components/Image/AllIages';

const Gallery = () => {
  const [AddImage, setAddImage] = useState(false)
  const [Images , setImages ] = useState([]);

  useEffect(() => {
    const quicky = async()=>{
        var data =await LoadAllImages();
        setImages(data);
    }
    quicky();

  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="text-3xl font-bold text-gray-800 mb-6">Gallery</div>

      <button
        onClick={() => {setAddImage(!AddImage); console.log("btn clicked")}}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Add An Image
      </button>

      {AddImage && <SelectImage setAddImage={setAddImage} AddImage={AddImage} setImages={setImages}/>}
      <AllIages Images={Images}></AllIages>
    </div>
  )
}

export default Gallery
