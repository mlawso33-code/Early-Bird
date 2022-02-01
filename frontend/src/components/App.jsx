// import react, child component
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalContext from '../contexts/context.js';
import Login from './login/Login.jsx';
import Register from './login/Register.jsx';
import StoreView from './store/StoreView.jsx';
import UserInfo from './login/UserInfo.jsx';


const App = () => {
  const [page, setPage] = useState('login');

  return (
    <GlobalContext.Provider value={{page, setPage}}>
      <BrowserRouter><Routes>

  <Route path="/" element={<Login />} />
  <Route path="register" element={<Register />} />
  <Route path="Home" element={<StoreView />} />

      </Routes></BrowserRouter>
    </GlobalContext.Provider>
  )
}

export default App;