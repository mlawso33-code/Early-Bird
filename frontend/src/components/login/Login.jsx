import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';
import { Link, withRouter, Redirect, useNavigate } from 'react-router-dom';
import Register from './Register.jsx';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';
import DataSimulator from './DataSimulator.jsx';

const Login = () => {
  const { page, setPage, userInfo, setUserInfo, storeData, setStoreData, loggedIn, setLoggedIn } = useContext(GlobalContext);
  const [loginCred, setLoginCred] = useState({
    username: '',
    email: '',
    password: '',
  })
  const saltRounds = 10;
  const myPlaintextPassword = loginCred.password;
  let navigate = useNavigate();

   function verifyLogin() {
      axios.get(`user/${loginCred.username}/${loginCred.password}`).then(async (result) => {
      if (!Array.isArray(result.data)) {
        alert('Username or password not valid!');
        return;
      }
      if (result.data !== false) {
        setUserInfo(result.data[0]);
        setLoggedIn(true);
        Axios.get(`/stores/nearby/${result.data[0].zip}`).then((result) => {
          setStoreData(result);
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

    if (loggedIn) {
      navigate('/Home')
    }


  return (<div className="container" style={{ height: '100%', width: '100%' }}>
    <img src="LOGO.png" style={{ height: '235px' }} />
    {/* <ConditionalLink to="/userInfo" condition={verifyLogin()===true}><button className="login-button">USER</button></ConditionalLink> */}
    <div className="input-field">
      <input type="text" name="username" className="login-input" placeholder="Username" onChange={handleChange}/>
      <input type="text" name="password" type="password" className="login-input" placeholder="Password" onChange={handleChange}/>
      <div className="buttons">
        <button className="login-button" onClick={verifyLogin}>LOGIN</button>
        <ConditionalLink to="/register" condition={1===1}><button className="login-button">REGISTER</button></ConditionalLink>
        <button className="facebook-button">Login with Facebook</button>
      </div>
    </div>
  </div>
  );
}

export default Login;