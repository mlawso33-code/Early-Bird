// import react, child component
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalContext from '../contexts/context.js';
import Login from './login/Login.jsx';
import Register from './login/Register.jsx';
import StoreView from './store/StoreView.jsx';
import UserUpdate from './login/UserUpdate.jsx';


const App = () => {
  const [page, setPage] = useState('userInfo');
  const [userInfo, setUserInfo] = useState({})
  const [storeData, setStoreData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <GlobalContext.Provider value={{page, setPage, userInfo, setUserInfo, storeData, setStoreData, loggedIn, setLoggedIn}}>
      <BrowserRouter><Routes>

  <Route path="/" element={<Login />} />
  <Route path="register" element={<Register />} />
  <Route path="Home" element={<StoreView />} />
  <Route path="userInfo" element={<UserUpdate />} />

      </Routes></BrowserRouter>
    </GlobalContext.Provider>
  )
}

export default App;