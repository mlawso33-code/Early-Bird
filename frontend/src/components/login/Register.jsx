import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';

const Register = () => {
  const { page, setPage } = useContext(GlobalContext);

  return (
    <div className="container" style={{height: '100%', width: '100%'}}>
    <img src="LOGO.png" className="logo"/>
    <div className="register-field">
      <input type="text" className="login-input" placeholder="Username" style={{marginTop: '44px'}}/>
      <input type="text" className="login-input" placeholder="Password"/>
      <input type="email" className="login-input" placeholder="Email"/>
      <input type="text" className="login-input" placeholder="Address"/>
      <div className="address">
        <input type="text" className="login-input" placeholder="City" style={{width: '50%',
    marginRight: '15px'}}/>
        <input type="text" className="login-input" placeholder="State" style={{width: '15%',
    marginRight: '15px'}}/>
        <input type="text" className="login-input" placeholder="Zipcode" style={{width: '25%',
    marginRight: '15px'}}/>
      </div>
      <div className="buttons">
        <button className="login-button">REGISTER</button>
      </div>
    </div>
  </div>
  )
}

export default Register;