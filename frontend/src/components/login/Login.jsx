import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';
import { Link } from 'react-router-dom';
import Register from './Register.jsx';

const Login = () => {
  const { page, setPage } = useContext(GlobalContext);

  function conditionalFunction() {
    //please make sure this function:
    //returns true if meets your conditions
    //returns false if doesn't meet your conditions
    return true;
  }

  const ConditionalLink = ({ children, to, condition }) => (!!condition && to)
      ? <Link to={to}>{children}</Link>
      : <>{children}</>;

  return (
    <div className="container" style={{height: '100%', width: '100%'}}>
      <img src="LOGO.png" style={{height: '235px'}}/>
      <div className="input-field">
        <input type="text" className="login-input" placeholder="Username"/>
        <input type="text" className="login-input" placeholder="Password"/>
        <div className="buttons">
          <ConditionalLink to="/home" condition={conditionalFunction()===true}><button className="login-button">LOGIN</button></ConditionalLink>
          <ConditionalLink to="/register" condition={conditionalFunction()===true}><button className="login-button">REGISTER</button></ConditionalLink>
          <button className="facebook-button">Login with Facebook</button>
        </div>
      </div>
    </div>
  );
}

export default Login;