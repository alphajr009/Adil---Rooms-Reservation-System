import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link  } from 'react-router-dom'
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';
import SRegisterscreen from './screens/SRegisterscreen';
import SLoginscreen from './screens/SLoginscreen';
import Dashboard from './screens/Dashboard';

function App() {



  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>
        <Routes>

          <Route path="/home" element={<Homescreen />} exact />
          <Route path="/book/:roomid/:fromdate/:todate" element={<Bookingscreen />} exact />
          <Route path="/register" element={<Registerscreen />} exact />
          <Route path="/login" element={<Loginscreen />} exact />
          <Route path="/profile" element={<Profilescreen />} exact />
          <Route path="/admin" element={<Adminscreen />} exact />
          <Route path="/" element={<Landingscreen />} exact />
          <Route path="/sregister" element={<SRegisterscreen />} exact />
          <Route path="/slogin" element={<SLoginscreen />} exact />
          <Route path="/dashboard" element={<Dashboard />} exact />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
