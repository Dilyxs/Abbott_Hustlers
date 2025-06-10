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
  <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
    <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Gallery</div>

    <div className="flex flex-row sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
      <button
        onClick={(e) => {
          e.preventDefault();
          window.location.href = window.location.pathname + "/home";
        }}
        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Return To Main Page
      </button>

      <button
        onClick={() => {
          setAddImage(!AddImage);
          console.log("btn clicked");
        }}
        className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Add An Image
      </button>
    </div>

    {AddImage && (
      <SelectImage
        setAddImage={setAddImage}
        AddImage={AddImage}
        setImages={setImages}
      />
    )}

    <AllIages Images={Images} />
  </div>
);

}

export default Gallery
