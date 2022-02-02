// import react, child component
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalContext from '../contexts/context.js';
import Login from './login/Login.jsx';
import Register from './login/Register.jsx';
import StoreView from './store/StoreView.jsx';
import UserInfo from './login/UserInfo.jsx';


const App = () => {
  const [page, setPage] = useState('userInfo');
  const [userInfo, setUserInfo] = useState({
    username: '',
    address: ''
  })
  const [storeData, setStoreData] = useState([]);

  return (
    <GlobalContext.Provider value={{page, setPage, userInfo, setUserInfo, storeData, setStoreData}}>
      <BrowserRouter><Routes>

  <Route path="/" element={<Login />} />
  <Route path="register" element={<Register />} />
  <Route path="Home" element={<StoreView />} />
  <Route path="userInfo" element={<UserInfo />} />

      </Routes></BrowserRouter>
    </GlobalContext.Provider>
  )
}

export default App;