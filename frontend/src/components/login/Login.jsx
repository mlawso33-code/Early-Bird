import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';

const Login = () => {
  const { page, setPage } = useContext(GlobalContext);

  return (
    <div className="container" style={{height: '100%', width: '100%'}}>
      <img src="LOGO.png" className="logo"/>
      <div className="input-field">
        <input type="text" className="login-input" placeholder="Username"/>
        <input type="text" className="login-input" placeholder="Password"/>
        <div className="buttons">
          <button className="login-button">LOGIN</button>
          <button className="login-button">REGISTER</button>
          <button className="facebook-button">Login with Facebook</button>
        </div>
      </div>
    </div>
  );
}

export default Login;