import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../../contexts/context.js';
import axios from 'axios';
import Store from './Store.jsx';

const Stores = () => {
  const { page, setPage, userInfo, setUserInfo, storeData, setStoreData, loggedIn, setLoggedIn, currStore, setCurrStore  } = useContext(GlobalContext);
  let stores = storeData.map((store, index) => {
    if (index === 0) {
      setCurrStore(store);
      return <Store selected={true} data={store} />
    } else {
      return <Store selected={false} data={store} />
    }
  });
  return (
    <div className="shop-container">
      {stores}
    </div>
  )
  }

export default Stores;