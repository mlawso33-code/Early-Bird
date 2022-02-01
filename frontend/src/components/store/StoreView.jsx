import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';
import Axios from 'Axios'


import ReviewList from './Stores/Reviews/ReviewList.jsx'

const StoreView = () => {
  const [stores, setStores] = useState([])
  const { page, setPage } = useContext(GlobalContext);

  //We need to confirm the user is logged in before returning the following html.
  //We don't want the user to be able to navigate to /home without being logged in.
  console.log(stores)
  function fetchStores() {
    Axios
      .get('/api/stores')
      .then(res => setStores(res.data))
  }

  useEffect(() => {
    fetchStores()
  }, [])

  return (
    <div className="wrapper" style={{ height: '100%', width: '100%' }}>
      <img src="LOGO.png" className="logo" />
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
          <ReviewList store={stores}/>
        </div>
      </div>
    </div>
  );
}

export default StoreView;