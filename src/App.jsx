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
import Gallery from './pages/Gallery';
import AuthPath from './pages/AuthPath';
import ColorPicker from './pages/ColorPicker';


function App() {

  const [location , setLocation ] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main_Page />} />
        <Route path='/addclient' element={<AuthPath><AddClient /></AuthPath>} />
        <Route path='/login' element={<Login location={location} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path='/dashBoard' element={<AuthPath><DashBoard /></AuthPath>} />
        <Route path='/register' element={<Register />} />
        <Route path='/calendar' element={<AuthPath><CalendarElement /></AuthPath>} />
        <Route path='/search' element={<AuthPath><SearchQuery /></AuthPath>} />
        <Route path='/search/:clientid' element={<AuthPath><ClientDetails /></AuthPath>} />
        <Route path="/test" element={<AuthPath><FullCaendar /></AuthPath>} />
        <Route path="/notes" element={<AuthPath><Notes /></AuthPath>} />
        <Route path='/finance' element={<AuthPath><Finances /></AuthPath>} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/ColorPicker' element={<AuthPath><ColorPicker /> </AuthPath>} />

      </Routes>
    </Router>
  )
}

export default App
