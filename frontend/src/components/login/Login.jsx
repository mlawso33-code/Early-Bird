import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';

const Login = () => {
  const { page, setPage } = useContext(GlobalContext);

  return (
    <div>
      <div>This is the Login page!</div>
      <button onClick={() => {
        setPage('register');
      }}>Go To Register Page</button>
      <button onClick={() => {
        setPage('userInfo');
      }}>Go To UserInfo Page</button>
      <button onClick={() => {
        setPage('storeView');
      }}>Go To Store View Page</button>
    </div>
  )
}

export default Login;