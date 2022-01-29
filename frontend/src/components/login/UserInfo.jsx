import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';

const UserInfo = () => {
  const { page, setPage } = useContext(GlobalContext);

  return (
    <div>
      <div>This is the UserInfo page!</div>
      <button onClick={() => {
        setPage('login');
      }}>Go To Login Page</button>
      <button onClick={() => {
        setPage('userInfo');
      }}>Go To UserInfo Page</button>
      <button onClick={() => {
        setPage('storeView');
      }}>Go To Store View Page</button>
    </div>

  )
}

export default UserInfo;