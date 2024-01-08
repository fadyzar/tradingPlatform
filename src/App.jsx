
import './App.css'

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import CustomNavbar from './Components/Navbar';
import Trading from './Pages/Trading';
import React from 'react';
import Wallet from './Pages/Wallet';
import Modal from './Components/Modal';


import News from './Pages/News';

function App() {
 

  return (
    
     <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/trading" element={<Trading />} />
        <Route path="/news" element={<News />} />
        <Route path="/wallet" element={<Wallet />} />

       
      </Routes>
      <Modal />
    </Router>
        
    
  )
}

export default App
