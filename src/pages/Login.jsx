import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginVerificationAPI } from '../../utils/APIFunc';
import DashBoard from './DashBoard';
import LoginForm from '../components/LoginForm';


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      <DashBoard/>;
    }
  }, [loggedIn]);

  const SubmitForm = async (e) => {
    console.log(username);
    console.log(password);
    e.preventDefault();
    try {
      const response = await LoginVerificationAPI(username, password);

      if (response.success === true) {
        alert("Login Succesful")
        setLoggedIn(true);
      } else{
      //  setUsername("");
      //  setPassword("");
        alert("Login failed. Try again.");
      }
    } catch (error) {
      alert("Login failed. Try again.");
      console.error("Ran into error:", error);
    }
  };

  return (
    <section>
      {loggedIn ? <DashBoard username={username}/>:
    <LoginForm 
    setPassword={setPassword}
    setUsername={setUsername}
    username={username}
    password={password}
    SubmitForm={SubmitForm}/>}
    </section>
  );
};

export default Login;
