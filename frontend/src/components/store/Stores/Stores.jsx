import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../../contexts/context.js';
import axios from 'axios';
import Store from './Store.jsx';

const Stores = () => {
  const { page, setPage, userInfo, setUserInfo, storeData, setStoreData, loggedIn, setLoggedIn, currStore, setCurrStore  } = useContext(GlobalContext);

  function getAverageRating(store) {
    let ratings = 0;
    if (Array.isArray(store.reviews) && store.reviews.length > 0) {
      store.reviews.forEach(store => {
        ratings += store.rating;
      })
      return (ratings / store.reviews.length).toFixed(1);
    } else {
      return 0;
    }
  };


  let ratings = [];
  let stores = storeData.map((store, index) => {
    store.average = getAverageRating(store);
    return <Store data={store} />
  });

  stores.sort(function (a, b) {
    return b.props.data.average - a.props.data.average
  });

  if (Object.keys(currStore).length === 0) {
    setCurrStore(stores[0].props.data);
  }

  return (
    <div className="shop-container">
      {stores}
    </div>
  )
  }

export default Stores;