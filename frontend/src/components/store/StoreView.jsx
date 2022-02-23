import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';
import Axios from 'Axios'
import ReviewList from './Stores/Reviews/ReviewList.jsx'
import axios from 'axios'
import { Link, withRouter, Redirect, useNavigate } from 'react-router-dom';
import ReviewList from './Stores/Reviews/ReviewList.jsx'
import Menu from './Menu/Menu.jsx'
import LoadingScreen from '../LoadingScreen.jsx'
import Shops from './Stores/Stores.jsx'
import MapIndex from '../map/MapIndex.js'
import { GiCoffeeBeans, GiBreadSlice, GiCoffeeMug } from 'react-icons/gi';
import {HiUserCircle} from 'react-icons/hi'
import {AiFillEdit} from 'react-icons/ai';


const StoreView = () => {
  const [stores, setStores] = useState([])
  const [menuModal, setMenuModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editLocation, setEditLocation] = useState(false);
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
        axios.get(`/stores/nearby/${result.data[0].latitude}/${result.data[0].longitude}`).then((result) => {
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

  let placeholder = userInfo.city + ', ' + userInfo.state;
  if (Object.keys(currStore).length > 0) {
    var drinks = JSON.parse(currStore.featured_drinks).map(drink => {
      return <div className="featured-drink">{drink}</div>
    });

    var foods = JSON.parse(currStore.featured_foods).map(food => {
      return <div className="featured-food">{food}</div>
    });
  }
  return (
    <>
      {loading === false ? (
        <div className="wrapper" style={{ height: '100%', width: '100%' }}>
          <img src="LOGO.png" className="logo" />
          <div className="nav-bar">
          <div className="profile-info">
            <div className="left">
            <div style={{color: 'white', fontSize: '20px', fontFamily: 'neue-haas-grotesk-display'}}>{userInfo.username}</div>
              <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
                <GiCoffeeBeans style={{ height: '25px', width: 'auto', color: '#34220a' }} ></GiCoffeeBeans>
                <div style={{color: 'white', fontSize: '24px', marginRight: '10px', marginLeft: '6px'}}>{userInfo.reward_points}</div>
              </div>
            </div>
            <div className="right">
            <ConditionalLink to="/userUpdate" condition={loggedIn}><HiUserCircle style={{color:'white', height: '40px', width: 'auto'}}/></ConditionalLink>
              <div className="login-link" style={{color: 'white', fontFamily: 'neue-haas-grotesk-display', fontSize: '12px'}} onClick={logout}
            >Log out</div>
            </div>
          </div>
          </div>
          <div className="portal-container" style={{ height: '100%', width: '100%', fontFamily: 'neue-haas-grotesk-display' }}>
            <div className="shops-module">
            {/* onClick={()=>{setEditLocation(!editLocation)}} */}
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '25px', fontFamily: 'poppins, sans-serif', marginTop: '15px' }}>RESULTS FROM <span className="location-style" style={{ fontWeight: 'normal', color: '#D2B48C' }}>{userInfo.city}, {userInfo.state}</span></div>
                <Shops />
            </div>
            <div className="shop-info">
              <div className="details">
                <div className="column-a">
                  <div className="shop-website">
                    <div style={{ color: 'white', fontSize: '30px', marginRight: '14px' }}>{currStore.name}</div>
                    <a style={{ fontSize: '12px', color: 'white' }} href={currStore.url}>Visit Website</a>
                  </div>
                  <div style={{ color: '#D2B48C' }}>MON-FRI {Object.keys(currStore).length > 0 ? currStore.store_open.slice(0, -3):''} AM - {Object.keys(currStore).length > 0 ? currStore.store_close.slice(0, -3):''} PM</div>

                  <button onClick={handleMenu}>Order Online</button>
                  <div className={`Modal ${menuModal ? 'Show' : ''}`}>
                    {menuModal ? <Menu key={currStore.id} store={currStore} toggle={handleMenu} user={userInfo} setUser={setUserInfo}/> : null}
                  </div>
                  <div className={`Overlay ${menuModal ? 'Show' : ''}`} />

                  <div className="featured" style={{ marginTop: '10px' }}>
                    <div style={{ color: 'white', fontSize: '30px' }}>Featured Items</div>
                    <hr className="hr" style={{ color: '#BEA69F', margin: '1px', size: '3px', width: '97%' }} />
                    <div className="featured-columns" style={{ display: 'flex', flexDirection: 'row', flexjustifyContent: 'flex-start' }}>
                      <div className="featured-foods">
                        <GiBreadSlice style ={{height: '33px', width: 'auto'}}/>
                        <hr style={{width: '124px'}}/>
                        {foods}
                      </div>
                      <div className="featured-drinks">
                      <GiCoffeeMug style ={{height: '33px', width: 'auto'}}/>
                        <hr style={{width: '124px'}}/>
                        {drinks}
                      </div>
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
          <ReviewList store={stores}/>
        </div>
      </div>
    </div>
        </div>
        : (<LoadingScreen />
        )}
    </>
  );
}

export default StoreView;