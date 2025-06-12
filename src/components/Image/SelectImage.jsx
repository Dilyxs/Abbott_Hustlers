import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react' // optional icon, or just use "×"
import {HandleChange, HandleSubmitFormData, LoadAllImages} from './HelperFunc'
import { label } from 'three/tsl';

const SelectImage = ({ setAddImage,AddImage,setImages }) => {
    const [Loading , setLoading ] = useState(false);
        const data = JSON.parse(localStorage.getItem("FormData"))
        const [FormData, setFormData] = useState(data || {"image":"","title":"","description":""})
        
        useEffect(()=>{

          localStorage.setItem("FormData",JSON.stringify(FormData))
            
        },[FormData])
  return (

    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      {/* Modal container */}
      <div className="relative bg-white p-6 rounded-2xl shadow-xl w-full max-w-md space-y-4">
        {/* Close Button */}
        <button
          onClick={()=>{setAddImage(!AddImage )}}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold text-gray-800">Select an Image</h2>

        <div>
          <label htmlFor="fileInput" className="block mb-1 text-sm font-medium text-gray-700">
            Upload Image or Video
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*,video/*"
            name='image'
            
            className="block w-full text-sm text-gray-600
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
            onChange={(e)=> HandleChange(e,setFormData)}
          />
        </div>

        <div>
          <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter title"
            value={FormData.title}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black-50"
            onChange={(e)=> HandleChange(e,setFormData)}
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Enter description"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black-50"
            value={FormData.description}
            onChange={(e)=> HandleChange(e,setFormData)}
          />
        </div>


        {Loading ? (<label className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">Currently Uploading</label>):
         <button
          type="button"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          onClick={async(e)=>{ 
            setLoading(true)
            await HandleSubmitFormData(e,FormData,setFormData,setAddImage,AddImage);
            var data = await LoadAllImages();
            setImages(data)
            setLoading(false)
            
            
          }}
        >Submit
        </button>}

       


      </div>
    </div>
  )
}

export default SelectImage
