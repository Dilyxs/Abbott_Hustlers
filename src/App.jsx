import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate,  } from "react-router-dom";  
import Main_Page from './Main_page';
import AddClient from './pages/AddClient';
import Login from './pages/Login';
import DashBoard from './pages/DashBoard';
import Register from './components/Register/Register';
import RouteProtector from './pages/RouteProtector';
import CalendarElement from './pages/CalendarElement';
import SearchQuery from './pages/SearchQuery';
import ClientDetails from './components/ClientView/ClientDetails';
import FullCaendar from './components/Calendar/FullCaendar';
import Notes from './pages/Notes';
import Finances from './pages/Finances';


function App() {

  const [location , setLocation ] = useState(null);

  return (
    <Router>
      <Routes>
      <Route path="/" element = {<Main_Page/>}></Route>
      <Route path='/addclient' element = {<AddClient/>}></Route>
      <Route path='/login' element = {<Login location={location}></Login>}></Route>
      <Route path="*" element={<Navigate to="/" replace />}/>
      <Route path='/dashBoard' element={<DashBoard/>}> </Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/calendar' element={<CalendarElement></CalendarElement>}></Route>
      <Route path='/search' element={<SearchQuery></SearchQuery>}></Route>
      <Route path='/search/:clientid' element={<ClientDetails></ClientDetails>}></Route>
      <Route path="/test" element={<FullCaendar></FullCaendar>}></Route>
      <Route path="/notes" element={<Notes></Notes>}></Route>
      <Route path='/finance' element={<Finances></Finances>}></Route>


      </Routes>
    </Router>

  )
}

export default App
