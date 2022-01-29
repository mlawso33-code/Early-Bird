// import react, child component
import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../contexts/context.js';
import Login from './login/Login.jsx';
import Register from './login/Register.jsx';
import StoreView from './store/StoreView.jsx';
import UserInfo from './login/UserInfo.jsx';


const App = () => {
  const [page, setPage] = useState('login');

  let pages = {
    login: <Login />,
    register: <Register />,
    storeView: <StoreView />,
    userInfo: <UserInfo />
  }

  return (
    <GlobalContext.Provider value={{page, setPage}}>
      <div>
        {pages[page]}
      </div>
    </GlobalContext.Provider>
  )
}

export default App;