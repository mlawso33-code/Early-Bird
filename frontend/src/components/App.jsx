// import react, child component
import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../contexts/context.js';
import Login from './Login.jsx';


const App = () => {
  const [page, setPage] = useState('login');

  let pages = {
    login: <Login />
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