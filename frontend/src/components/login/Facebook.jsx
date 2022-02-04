import FacebookLogin from 'react-facebook-login';
import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';

const Facebook = () => {
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');
  const {
    page,
    setPage,
    userInfo,
    setUserInfo,
    storeData,
    setStoreData,
    loggedIn,
    setLoggedIn,
    currStore,
    setCurrStore } = useContext(GlobalContext);

  const responseFacebook = (response) => {
    console.log('facebook login only works on deployment', response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLoggedin(true);
      localStorage.setItem('logged', 'true')
      setUserInfo({
        ...userInfo,
        username: response.data.name,
        email: response.data.email
      })
    } else {
      setLoggedin(false);
      localStorage.setItem('logged', 'false')
    }
  }

  return (
    <div className="container">
      <div >
        { !loggedIn &&
        <FacebookLogin
        appId="361650595437995"
        autoLoad={false}
        fields="name,email,picture"
        scope="public_profile,user_friends"
        callback={responseFacebook}
        icon="fa-facebook" />
        }
        {
          loggedIn &&
          <Image src={picture} roundedCircle />
        }
      </div>
      {loggedIn &&
      <div>
        {response.data.name}{response.data.email}
      </div>
        }
        </div>
  );
};

export default Facebook;