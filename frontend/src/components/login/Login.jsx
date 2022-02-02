import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';
import { Link } from 'react-router-dom';
import Register from './Register.jsx';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Axios from 'axios';

const Login = () => {
  const { page, setPage } = useContext(GlobalContext);
  const [loginCred, setLoginCred] = useState({
    username: '',
    email: '',
    password: '',
  })
  const saltRounds = 10;
  const myPlaintextPassword = loginCred.password;
  let loggedIn = false;

  function conditionalFunction() {
    //please make sure this function:
    //returns true if meets your conditions
    //returns false if doesn't meet your conditions
    Axios.get(`user/${loginCred.username}/${loginCred.password}`).then((result) => {
      //console.log(result);
      if (result) {
        loggedIn = true;
        return true;
      } else {
        loggedIn = false;
        return false;
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
      console.log(loginCred)
    };

  return (
    <div className="container" style={{ height: '100%', width: '100%' }}>
      <img src="LOGO.png" style={{ height: '235px' }} />
      {/* <ConditionalLink to="/userInfo" condition={conditionalFunction()===true}><button className="login-button">USER</button></ConditionalLink> */}
      <div className="input-field">
        <input type="text" name="username" className="login-input" placeholder="Username" onChange={handleChange}/>
        <input type="text" name="password" className="login-input" placeholder="Password" onChange={handleChange}/>
        <div className="buttons">
          <ConditionalLink to="/home" condition={loggedIn === true}><button className="login-button" onClick={conditionalFunction}>LOGIN</button></ConditionalLink>
          <ConditionalLink to="/register" condition={conditionalFunction === false}><button className="login-button">REGISTER</button></ConditionalLink>
          <button className="facebook-button">Login with Facebook</button>
        </div>
      </div>
    </div>
  );
}

export default Login;