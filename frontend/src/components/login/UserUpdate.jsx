import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';
import axios from 'axios';
import {GiCoffeeBeans} from 'react-icons/gi';
import {FiCoffee} from 'react-icons/fi';
import { Link, withRouter, Redirect, useNavigate } from 'react-router-dom';

const UserUpdate = () => {
  const { page, setPage, userInfo, setUserInfo, loggedIn, setLoggedIn  } = useContext(GlobalContext);
  let navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({
    username: userInfo.username,
    password: userInfo.password,
    email: userInfo.email,
    street_address: userInfo.street_address,
    city: userInfo.city,
    state: userInfo.state,
    zip: userInfo.zip,
    reward_points: userInfo.reward_points
  });

  var log = localStorage.getItem('logged')
  if (log === false) {
    navigate('/');
  }

  const handleChange = (event) => {
    setCurrentUser({
      ...currentUser,
      [event.target.name]: event.target.value
    })
  };

  const ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(currentUser.email)) {
        return (true)
      } else {
        return (false)
      }
    };

  const hasNumber = (myString) => {
      return /\d/.test(myString);
    };

  const hasLetter = (myString) => {
    return /[a-zA-Z]/.test(myString)
  };

  return (
    <div className="container" style={{height: '100%', width: '100%'}}>
    <img src="LOGO.png" className="logo"/>
    <div style={{ height: '30px', color: 'white', top: '14px', right: '100px', position: 'absolute' }}>{userInfo.username}</div>
    <GiCoffeeBeans style={{height: '30px', color: 'white', top:'8px', right: '50px', position: 'absolute'}} ></GiCoffeeBeans>
    <div style={{height: '30px', color: 'white', top:'14px', right: '10px', position: 'absolute'}}>{userInfo.reward_points}</div>
    <div className="register-field">
    <input type="text" className="login-input" value={userInfo.username} name="username" style={{marginTop: '44px'}} readOnly/>
      <input type="email" className="login-input" placeholder={userInfo.email} name="email" onChange={handleChange}/>
      <input type="text" className="login-input" placeholder={userInfo.street_address} name="street_address" onChange={handleChange}/>
      <div className="address">
        <input type="text" className="login-input" placeholder={userInfo.city} name="city" style={{width: '50%',
    marginRight: '15px'}} onChange={handleChange}/>
        <input type="text" className="login-input" placeholder={userInfo.state} name="state" style={{width: '15%',
    marginRight: '15px'}} onChange={handleChange}/>
        <input type="text" className="login-input" placeholder={userInfo.zip} name="zip" style={{width: '25%',
    marginRight: '15px'}} onChange={handleChange}/>
      </div>
      <div className="buttons">
        <button className="login-button" onClick={(event) => {
           if (currentUser.email.length === 0 || !ValidateEmail(currentUser.email)) {
            alert('Please enter a valid Email')
          } else if (currentUser.street_address.length === 0 || !hasNumber(currentUser.street_address) || !hasLetter(currentUser.street_address)) {
            alert('Please enter a valid address')
          } else if (currentUser.city.length === 0) {
            alert('Please enter a valid city')
          } else if (currentUser.state.length !== 2) {
            alert('Please enter a valid state')
          } else if (currentUser.zip.length === 0 || hasLetter(currentUser.zip)) {
            alert('Please enter a valid Zipcode')
          } else {
            alert('put request attempted')
            axios.put('/user', currentUser).then(
              navigate('/Home')
            )
          }
        }}>Update</button>
        <GiCoffeeBeans className="login-input"></GiCoffeeBeans>

        <div className="login-input">Total: {userInfo.reward_points}</div>

      </div>
    </div>

  </div>
  )
}

export default UserUpdate;

