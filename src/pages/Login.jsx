import React, {useEffect, useState} from 'react'
import { LoginUser, TokenMaker } from '../../utils/APIFunc';
import { useNavigate } from 'react-router-dom';

const Login = ({location}) => {
  const [LoginInfo , setLoginInfo ] = useState(()=>{ return localStorage.getItem("LoginInfo")!=null? JSON.parse(localStorage.getItem("LoginInfo")):{email:"", password:""}});
  const Navigate = useNavigate();

  useEffect(()=>{

    const handler = ()=>{
      localStorage.setItem("LoginInfo", JSON.stringify(LoginInfo))
    }

    window.addEventListener("pagehide",handler );

    return ()=> window.removeEventListener("pagehide",handler)

  },

[LoginInfo])




  const HandleSubmitForm = async (e) => {
    e.preventDefault();
  
    const [response,data] = await LoginUser(LoginInfo.email, LoginInfo.password); // await here
  
    if (response === "ok") {
      console.log(location)
      console.log(data['id'])
      const responseToken = await TokenMaker(data['id'])
      localStorage.setItem("Token", JSON.stringify(responseToken))

      if (location != null){setTimeout(()=>{  Navigate(location);},200)};

       setTimeout(()=>{setTimeout(()=>{Navigate('/search')})}, 200)

    } else {
      setLoginInfo({ email: "", password: "" });
      alert("incorrect mate");
    }
  };

  return (
    <div>
    <section className="flex w-full justify-center items-center min-h-screen">
      <form
        className="shadow-lg rounded-2xl p-8 w-full max-w-xl space-y-6"
        onSubmit={(e)=>{HandleSubmitForm(e);}}
        id="form"
      >
        <label htmlFor="">Login Information</label>
        <div>
          <input
            type="text"
            placeholder="email"
            name='email'
            value={LoginInfo.email}
            onChange={(e) => {setLoginInfo((prev)=>({...prev, [e.target.name]:e.target.value}))}}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            name='password'
            value={LoginInfo.password}
            onChange={(e) => {setLoginInfo((prev)=>({...prev, [e.target.name]:e.target.value}))}}
          />
        </div>
        <button className="text-2xl text-black bg-amber-50 w-full hover:text-blue-900 cursor-pointer hover:bg-purple-400">
          Login
        </button>
        <div>
          <a className='hover:cursor-pointer hover:bg-blue-900' onClick={(e)=>{e.preventDefault();
            Navigate("/register")
          }}> Haven't Registered?</a>
        </div>
      </form>
    </section>
    

        </div>
  )
}

export default Login