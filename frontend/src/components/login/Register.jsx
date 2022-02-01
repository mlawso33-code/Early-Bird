import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';
import Axios from'Axios';
import {GiCoffeeBeans} from 'react-icons/gi'

const Register = () => {
  const { page, setPage } = useContext(GlobalContext);
  const [userRegister, setUserRegister] = useState({
    username: '',
    password: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleChange = (event) => {
    setUserRegister({
      ...userRegister,
      [event.target.name]: event.target.value
    })
  };

  const ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userRegister.email)) {
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
    <div className="register-field">
      <input type="text" className="login-input" placeholder="Username" name="username" style={{marginTop: '44px'}} onChange={handleChange}/>
      <input type="text" className="login-input" placeholder="Password" name="password" onChange={handleChange}/>
      <input type="email" className="login-input" placeholder="Email" name="email" onChange={handleChange}/>
      <input type="text" className="login-input" placeholder="Address" name="address" onChange={handleChange}/>
      <div className="address">
        <input type="text" className="login-input" placeholder="City" name="city" style={{width: '50%',
    marginRight: '15px'}} onChange={handleChange}/>
        <input type="text" className="login-input" placeholder="State" name="state" style={{width: '15%',
    marginRight: '15px'}} onChange={handleChange}/>
        <input type="text" className="login-input" placeholder="Zipcode" name="zip" style={{width: '25%',
    marginRight: '15px'}} onChange={handleChange}/>
      </div>
      <div className="buttons">
        <button className="login-button" onClick={(event) => {
           if (userRegister.username.length === 0) {
             alert('Please enter a Username')
           } else if (userRegister.password.length === 0) {
            alert('Please enter a Password')
          } else if (userRegister.email.length === 0 || !ValidateEmail(userRegister.email)) {
            alert('Please enter a valid Email')
          } else if (userRegister.address.length === 0 || !hasNumber(userRegister.address) || !hasLetter(userRegister.address)) {
            alert('Please enter a valid adress')
          } else if (userRegister.username.includes('<')) {
            let text = userRegister.username;
            let result = text.replace("<", "&lt;")
            setUserRegister({
              ...userRegister,
              username: text
            })
          } else if (userRegister.city.length === 0) {
            alert('Please enter a valid city')
          } else if (userRegister.state.length !== 2) {
            alert('Please enter a valid state')
          } else if (userRegister.zip.length !== 5 || hasLetter(userRegister.zip)) {
            alert('Please enter a valid Zipcode')
          } else {
            Axios.post('/api/some_endpoint', userRegister).then(
              console.log(userRegister)
            )
          }
        }}>Register</button>
      </div>
    </div>
  </div>
  )
}

export default Register;