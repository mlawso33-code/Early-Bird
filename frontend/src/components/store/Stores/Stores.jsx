import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../../contexts/context.js';
import axios from 'axios';

const Stores = () => {
  const { page, setPage } = useContext(GlobalContext);
  let stores;

  axios.get('/api/stores').then((result) => {
    //db.query('SELECT * FROM stores WHERE zip=?', ['%100%'], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        stores = result.data.map((store, index) => {
          let { name, street_address, city, state, zip, latitude, longitude, store_open, store_close, url } = store;
          if (index === 1) {
            return (<div className="shop-entry" style={{backgroundColor: 'white', paddingLeft: '7px', paddingTop: '7px', background: 'linear-gradient(180deg, #6b5a55 86%, #00ffff00 50%)'}}>
            <div style={{color: 'white'}}>{name}</div>
            <div className="rating">
              <div style={{marginRight: '10px', color: '#fff'}}>5.0</div>
              <div style={{color: '#FFCF2E'}}>★★★★★</div>
            </div>
            <div style={{color: '#ffffffa6'}}>1.3 Miles from your location.</div>
            <div className="tags">
              <div className="tag">COFEE</div>
              <div className="tag">TEA</div>
              <div className="tag">FOOD</div>
            </div>
            <hr style={{border: '1px solid rgb(190, 166, 159)'}} />
          </div>)
          } else {
            return (<div className="shop-entry">
            <div style={{color: 'white'}}>{name}</div>
            <div className="rating">
              <div style={{marginRight: '10px', color: '#fff'}}>5.0</div>
              <div style={{color: '#FFCF2E'}}>★★★★★</div>
            </div>
            <div style={{color: '#ffffffa6'}}>1.3 Miles from your location.</div>
            <div className="tags">
              <div className="tag">COFEE</div>
              <div className="tag">TEA</div>
              <div className="tag">FOOD</div>
            </div>
            <hr style={{color: 'white', width: '100%'}} />
          </div>)
          }
        });
      }
  });

  if (stores == null) {
    return <div>Loading stores...</div>
  }

  return (
    <div className="shops-module">
          <div style={{color: 'white', fontWeight: 'bold', fontSize: '25px', fontFamily: 'poppins, sans-serif'}}>RESULTS FROM <span className="location-style" style={{fontWeight: 'normal', color: '#D2B48C'}}>NEW YORK, NEW YORK</span></div>
          <div className="shop-container">
            {stores}
          </div>
        </div>
  )
  }

export default Stores;