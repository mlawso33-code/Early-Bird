import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';

const StoreView = () => {
  const { page, setPage } = useContext(GlobalContext);

  return (
    <div>
      <div>This is the StoreView page!</div>
      <button onClick={() => {
        setPage('login');
      }}>Go To Login Page</button>
      <button onClick={() => {
        setPage('userInfo');
      }}>Go To UserInfo Page</button>
      <button onClick={() => {
        setPage('register');
      }}>Go To Register Page</button>
    </div>

  )
}

export default StoreView;