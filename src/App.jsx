import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";  
import Main_Page from './Main_page';
import AddClient from './pages/AddClient';
import Login from './pages/Login';
import DashBoard from './pages/DashBoard';


function App() {

  return (
    <Router>
      <Routes>
      <Route path="/" element = {<Main_Page/>}></Route>
      <Route path='/addclient' element = {<AddClient/>}></Route>
      <Route path='/login' element = {<Login/>}></Route>
      <Route path="*" element={<Navigate to="/" replace />}/>
      <Route path='/DashBoard' element={<DashBoard/>}> </Route>



      </Routes>
    </Router>

  )
}

export default App
