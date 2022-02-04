import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';
import axios from 'axios'
import { Link, withRouter, Redirect, useNavigate } from 'react-router-dom';
import ReviewList from './Stores/Reviews/ReviewList.jsx'
import Menu from './Menu.jsx'
import LoadingScreen from '../LoadingScreen.jsx'
import Shops from './Stores/Stores.jsx'
import MapIndex from '../map/MapIndex.js'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GiCoffeeBeans } from 'react-icons/gi';

const StoreView = () => {
  const [stores, setStores] = useState([])
  const [menuModal, setMenuModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const { page, setPage, userInfo, setUserInfo, storeData, setStoreData, loggedIn, setLoggedIn, currStore, setCurrStore } = useContext(GlobalContext);
  let navigate = useNavigate();
  //We need to confirm the user is logged in before returning the following html.
  //We don't want the user to be able to navigate to /home without being logged in.

  function handleMenu() {
    setMenuModal(!menuModal)
  }

  function fetchStores() {
    axios
      .get('/stores')
      .then(res => setStores(res.data))
  }

  useEffect(() => {
    fetchStores()
    checkLogin()
  }, [])

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, [])



  function checkLogin() {
  let log = localStorage.getItem('logged')
  let logUser = localStorage.getItem('username') || undefined
  if (log === 'false' || logUser === undefined) {
    navigate('/');
  } else {
    let userLog = localStorage.getItem('username')
    let userPass = localStorage.getItem('password')
    axios.get(`user/${userLog}/${userPass}`).then(async (result) => {
      if (!Array.isArray(result.data)) {
        alert('Username or password not valid!');
        return;
      }
      if (result.data !== false) {
        setUserInfo(result.data[0]);
        setLoggedIn(true);
        var log = localStorage.getItem('logged')
        console.log('NOTED ZIP 1:::', result.data[0].zip)
        axios.get(`/stores/nearby/${result.data[0].zip}`).then((result) => {
          setStoreData(result.data);
        })
      } else {
        alert("Username or password was not recognized!");
      }
    });
  }
};

  const ConditionalLink = ({ children, to, condition }) => (!!condition && to)
    ? <Link to={to}>{children}</Link>
    : <>{children}</>;

  function logout() {
    localStorage.setItem('logged', 'false')
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    setLoggedIn(false)
    navigate('/');
  }

  return (
    <>
      {loading === false ? (
        <div className="wrapper" style={{ height: '100%', width: '100%' }}>
          <img src="LOGO.png" className="logo" />
          <div style={{ height: '30px', color: 'white', top: '14px', right: '100px', position: 'absolute' }}>{userInfo.username}</div>
          <GiCoffeeBeans style={{ height: '30px', color: 'white', top: '8px', right: '50px', position: 'absolute' }} ></GiCoffeeBeans>
          <div style={{ height: '30px', color: 'white', top: '14px', right: '10px', position: 'absolute' }}>{userInfo.reward_points}</div>
          <ConditionalLink to="/userUpdate" condition={loggedIn}><button style={{ height: '25px', top: '32px', right: '60px', position: 'absolute' }}
          >Update</button></ConditionalLink>
          <button style={{ height: '25px', top: '32px', right: '10px', position: 'absolute' }} onClick={logout}
          >Logout</button>
          <div className="nav-bar"></div>
          <div className="portal-container" style={{ height: '100%', width: '100%', fontFamily: 'neue-haas-grotesk-display' }}>
            <div className="shops-module">
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '25px', fontFamily: 'poppins, sans-serif', marginTop: '15px' }}>RESULTS FROM <span className="location-style" style={{ fontWeight: 'normal', color: '#D2B48C' }}>{userInfo.city}, {userInfo.state}</span></div>
                <Shops />
            </div>
            <div className="shop-info">
              <div className="details">
                <div className="column-a">
                  <div className="shop-website">
                    <div style={{ color: 'white', fontSize: '30px', marginRight: '14px' }}>COFFEE SHOP</div>
                    <div style={{ fontSize: '12px', color: 'white' }}>Visit Website</div>
                  </div>
                  <div style={{ color: '#D2B48C' }}>MON-FRI 09:00 AM - 07:00 PM</div>

                  <button onClick={handleMenu}>Order Online</button>
                  <div className={`Modal ${menuModal ? 'Show' : ''}`}>
                    {menuModal ? <Menu toggle={handleMenu} /> : null}
                  </div>
                  <div className={`Overlay ${menuModal ? 'Show' : ''}`} />

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
                  <MapIndex />
                </div>
                <hr className="hr" />
              </div>
              <ReviewList key={currStore.id} store={currStore} userID={userInfo.id} />
            </div>
          </div>
        </div>)
        : (<LoadingScreen />
        )}
    </>
  );
}

export default StoreView;