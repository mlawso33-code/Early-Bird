import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';
import axios from 'axios'
import { Link, withRouter, Redirect, useNavigate } from 'react-router-dom';
import ReviewList from './Stores/Reviews/ReviewList.jsx'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {GiCoffeeBeans} from 'react-icons/gi';

const StoreView = () => {
  const [stores, setStores] = useState([])
  const [users, setUsers] = useState([])
  const { page, setPage, userInfo, setUserInfo, storeData, setStoreData, loggedIn, setLoggedIn  } = useContext(GlobalContext);
  let navigate = useNavigate();
  //We need to confirm the user is logged in before returning the following html.
  //We don't want the user to be able to navigate to /home without being logged in.

  function fetchStores() {
    axios
      .get('/api/stores')
      .then(res => setStores(res.data))
  }
  function fetchUsers() {
    axios
      .get('/api/users')
      .then(res => setUsers(res.data))
  }

  // console.log('users:::', users)
  //console.log('stores:::')

  useEffect(() => {
    fetchStores()
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [])

  // const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   if (!user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     const uid = user.uid;
  //     //const uid = user.uid;
  //     // ...
  //     return(
  //       <div>not logged in</div>
  //     )
  //   } else {
  //     // User is signed out
  //     // ...
  //   }
  // });

  if (loggedIn === false) {
    navigate('/');
  } else {
    console.log('userInfo', userInfo)
  }

  const ConditionalLink = ({ children, to, condition }) => (!!condition && to)
    ? <Link to={to}>{children}</Link>
    : <>{children}</>;

  return (
    <div className="wrapper" style={{ height: '100%', width: '100%' }}>
      <img src="LOGO.png" className="logo" />
      <div style={{ height: '30px', color: 'white', top: '14px', right: '100px', position: 'absolute' }}>{userInfo.username}</div>
      <ConditionalLink to="/userUpdate" condition={1===1}><button style={{height: '30px', top: '35px', right: '40px', position: 'absolute' }}>UPDATE</button></ConditionalLink>
      <GiCoffeeBeans style={{ height: '30px', color: 'white', top: '8px', right: '50px', position: 'absolute' }} ></GiCoffeeBeans>
      <div style={{ height: '30px', color: 'white', top: '14px', right: '10px', position: 'absolute' }}>{userInfo.reward_points}</div>
      <div className="nav-bar"></div>
      <div className="portal-container" style={{ height: '100%', width: '100%', fontFamily: 'neue-haas-grotesk-display' }}>
        <div className="shops-module">
          <div style={{ color: 'white', fontWeight: 'bold', fontSize: '25px', fontFamily: 'poppins, sans-serif' }}>RESULTS FROM <span className="location-style" style={{ fontWeight: 'normal', color: '#D2B48C' }}>NEW YORK, NEW YORK</span></div>
          <div className="shop-container">
            <div className="shop-entry" style={{ backgroundColor: 'white', paddingLeft: '7px', paddingTop: '7px', background: 'linear-gradient(180deg, #6b5a55 86%, #00ffff00 50%)' }}>
              <div style={{ color: 'white' }}>COFFEE SHOP</div>
              <div className="rating">
                <div style={{ marginRight: '10px', color: '#fff' }}>5.0</div>
                <div style={{ color: '#FFCF2E' }}>★★★★★</div>
              </div>
              <div style={{ color: '#ffffffa6' }}>1.3 Miles from your location.</div>
              <div className="tags">
                <div className="tag">COFEE</div>
                <div className="tag">TEA</div>
                <div className="tag">FOOD</div>
              </div>
              <hr style={{ border: '1px solid rgb(190, 166, 159)' }} />
            </div>
            <div className="shop-entry">
              <div style={{ color: 'white' }}>COFFEE SHOP</div>
              <div className="rating">
                <div style={{ marginRight: '10px', color: '#fff' }}>5.0</div>
                <div style={{ color: '#FFCF2E' }}>★★★★★</div>
              </div>
              <div style={{ color: '#ffffffa6' }}>1.3 Miles from your location.</div>
              <div className="tags">
                <div className="tag">COFEE</div>
                <div className="tag">TEA</div>
                <div className="tag">FOOD</div>
              </div>
              <hr style={{ color: 'white', width: '100%', paddingLeft: '0px' }} />
            </div>
            <div className="shop-entry">
              <div style={{ color: 'white' }}>COFFEE SHOP</div>
              <div className="rating">
                <div style={{ marginRight: '10px', color: '#fff' }}>5.0</div>
                <div style={{ color: '#FFCF2E' }}>★★★★★</div>
              </div>
              <div style={{ color: '#ffffffa6' }}>1.3 Miles from your location.</div>
              <div className="tags">
                <div className="tag">COFEE</div>
                <div className="tag">TEA</div>
                <div className="tag">FOOD</div>
              </div>
              <hr style={{ color: 'white', width: '100%' }} />
            </div>
            <div className="shop-entry">
              <div style={{ color: 'white' }}>COFFEE SHOP</div>
              <div className="rating">
                <div style={{ marginRight: '10px', color: '#fff' }}>5.0</div>
                <div style={{ color: '#FFCF2E' }}>★★★★★</div>
              </div>
              <div style={{ color: '#ffffffa6' }}>1.3 Miles from your location.</div>
              <div className="tags">
                <div className="tag">COFEE</div>
                <div className="tag">TEA</div>
                <div className="tag">FOOD</div>
              </div>
              <hr style={{ color: 'white', width: '100%' }} />
            </div>
          </div>
        </div>
        <div className="shop-info">
          <div className="details">
            <div className="column-a">
              <div className="shop-website">
                <div style={{ color: 'white', fontSize: '30px', marginRight: '14px' }}>COFFEE SHOP</div>
                <div style={{ fontSize: '12px', color: 'white' }}>Visit Website</div>
              </div>
              <div style={{ color: '#D2B48C' }}>MON-FRI 09:00 AM - 07:00 PM</div>
              <div className="featured" style={{ marginTop: '10px' }}>
                <div style={{ color: 'white', fontSize: '30px' }}>Featured Items</div>
                <hr className="hr" style={{ color: '#BEA69F', margin: '1px', size: '3px', width: '97%' }} />
                <div className="featured-items" style={{ display: 'flex', flexDirection: 'row', flexjustifyContent: 'flex-start' }}>
                  <div className="featured-item">Item</div>
                  <div className="featured-item">Item</div>
                  <div className="featured-item">Item</div>
                </div>
              </div>
            </div>
            <div className="column-b">
              Google Map
            </div>
            <hr className="hr" />
          </div>
          {/* <ReviewList store={stores[0]} user={users}/> */}
        </div>
      </div>
    </div>
  );
}

export default StoreView;