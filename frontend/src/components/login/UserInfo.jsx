import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';
import Axios from 'Axios';
import {GiCoffeeBeans} from 'react-icons/gi'
import {FiCoffee} from 'react-icons/fi'

const UserInfo = () => {
  const { page, setPage } = useContext(GlobalContext);
  const [currentUser, setCurrentUser] = useState({
    username: 'this name is hardcoded',
    email: 'myemail@hardcoded.com',
    address: '123 hard code ave.',
    city: 'hardcode',
    state: 'HC',
    zip: '00000',
    points: 7000,
  });

  // useEffect(() => {
  //   Axios.get('/api/some_endpoint').then((result) => {
  //     console.log(result);
  //      setCurrentUser({
  //       username: result.data.username,
  //       email: result.data.email,
  //       address: result.data.address,
  //       city: result.data.city,
  //       state: result.data.state,
  //       zip: result.data.zip,
  //       points: 0,
  // })
  //   })
  // })

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
    <GiCoffeeBeans style={{height: '30px', color: 'white', top:'8px', right: '50px', position: 'absolute'}} ></GiCoffeeBeans>
    <div style={{height: '30px', color: 'white', top:'14px', right: '10px', position: 'absolute'}}>{currentUser.points}</div>
    <div className="register-field">
    <input type="text" className="login-input" value={currentUser.username} name="username" style={{marginTop: '44px'}} readOnly/>
      <input type="email" className="login-input" placeholder={currentUser.email} name="email" onChange={handleChange}/>
      <input type="text" className="login-input" placeholder={currentUser.address} name="adress" onChange={handleChange}/>
      <div className="address">
        <input type="text" className="login-input" placeholder={currentUser.city} name="city" style={{width: '50%',
    marginRight: '15px'}} onChange={handleChange}/>
        <input type="text" className="login-input" placeholder={currentUser.state} name="state" style={{width: '15%',
    marginRight: '15px'}} onChange={handleChange}/>
        <input type="text" className="login-input" placeholder={currentUser.zip} name="zip" style={{width: '25%',
    marginRight: '15px'}} onChange={handleChange}/>
      </div>
      <div className="buttons">
        <button className="login-button" onClick={(event) => {
           if (currentUser.email.length === 0 || !ValidateEmail(currentUser.email)) {
            alert('Please enter a valid Email')
          } else if (currentUser.address.length === 0 || !hasNumber(currentUser.address) || !hasLetter(currentUser.address)) {
            alert('Please enter a valid adress')
          } else if (currentUser.city.length === 0) {
            alert('Please enter a valid city')
          } else if (currentUser.state.length !== 2) {
            alert('Please enter a valid state')
          } else if (currentUser.zip.length === 0 || hasLetter(currentUser.zip)) {
            alert('Please enter a valid Zipcode')
          } else {
            Axios.put('/api/some_endpoint', currentUser).then(
              //change pages
            )
          }
        }}>Update Info</button>
        <GiCoffeeBeans className="login-input"></GiCoffeeBeans>
        {/* <FiCoffee className="login-input"></FiCoffee> */}
        <div className="login-input">Total: {currentUser.points}</div>
      </div>
    </div>

  </div>
  )
}

export default UserInfo;