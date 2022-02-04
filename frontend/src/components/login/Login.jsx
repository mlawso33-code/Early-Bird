import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';
import { Link, withRouter, Redirect, useNavigate } from 'react-router-dom';
import Register from './Register.jsx';
import axios from 'axios';
import Facebook from './Facebook.jsx'
import DataSimulator from './DataSimulator.jsx';

const Login = () => {
  const { page, setPage, userInfo, setUserInfo, storeData, setStoreData, loggedIn, setLoggedIn, currStore, setCurrStore } = useContext(GlobalContext);
  const [loginCred, setLoginCred] = useState({
    username: '',
    email: '',
    password: '',
  })
  const saltRounds = 10;
  const myPlaintextPassword = loginCred.password;
  let navigate = useNavigate();


  function verifyLogin() {
    localStorage.setItem('username', loginCred.username)
    localStorage.setItem('password', loginCred.password)
    axios.get(`user/${loginCred.username}/${loginCred.password}`).then(async (result) => {
      if (!Array.isArray(result.data)) {
        alert('Username or password not valid!');
        return;
      }
      if (result.data !== false) {
        setUserInfo(result.data[0]);
        localStorage.setItem('logged', 'true')
        var log = localStorage.getItem('logged')
        axios.get(`/stores/nearby/${result.data[0].latitude}/${result.data[0].longitude}`).then((result) => {
          setStoreData(result.data);
          setLoggedIn(true);
        })
      } else {
        alert("Username or password was not recognized!");
      }
    });
  }

  const ConditionalLink = ({ children, to, condition }) => (!!condition && to)
    ? <Link to={to}>{children}</Link>
    : <>{children}</>;

  const handleChange = (event) => {
    setLoginCred({
      ...loginCred,
      [event.target.name]: event.target.value
    })
  };
  //switch these for lines 23 and 24 if we want returning to login page to auto log out
  // localStorage.setItem('username', loginCred.username)
  // localStorage.setItem('password', loginCred.password)
  if (loggedIn) {
    navigate('/Home')
  }


  return (<div className="container" style={{ height: '100%', width: '100%' }}>
    <img src="LOGO.png" style={{ height: '235px' }} />
    {/* <ConditionalLink to="/userInfo" condition={verifyLogin()===true}><button className="login-button">USER</button></ConditionalLink> */}
    <div className="input-field">
      <input type="text" name="username" className="login-input" placeholder="Username" onChange={handleChange} />
      <input type="text" name="password" type="password" className="login-input" placeholder="Password" onChange={handleChange} />
      <div className="buttons">
        <button className="login-button" onClick={verifyLogin}>LOGIN</button>
        <ConditionalLink to="/register" condition={1 === 1}><button className="login-button">REGISTER</button></ConditionalLink>
        <Facebook />
      </div>
      <div class="fb-login-button" style={{display: 'flex', alignItems: 'center', marginTop: '10px'}} data-width="" data-size="large" data-button-type="login_with" data-layout="rounded" data-auto-logout-link="false" data-use-continue-as="false"></div>
    </div>
  </div>
  );
}

export default Login;