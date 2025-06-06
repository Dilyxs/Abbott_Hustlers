import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../../utils/APIFunc';

const Register = () => {
  const [info, setinfo] = useState({
    email: '',
    password: ''
  });

  



  const Navigate = useNavigate();

  const HandlePost = async(email,password) =>{
    var response = await RegisterUser(email, password)
    if (response === "ok"){
      alert("You have created your account, pls proceed to login now!");
      Navigate("/login");
    }else{
      alert("Bro stop fooling around")
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center">
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          console.log(info); 
          setinfo({
            email: '',
            password: ''
          });
          HandlePost(info.email, info.password);

        }}
        className=" p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        
        <input
          type="text"
          placeholder="Enter your email"
          name="email"
          value={info.email}
          onChange={(e) => {
            e.preventDefault();
            setinfo((prev) => ({
              ...prev,
              [e.target.name]: e.target.value
            }));
          }}
          className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={info.password}
          onChange={(e) => {
            e.preventDefault();
            setinfo((prev) => ({
              ...prev,
              [e.target.name]: e.target.value
            }));
          }}
          className="mb-6 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
