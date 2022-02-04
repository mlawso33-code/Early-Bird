import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../../contexts/context.js';
import axios from 'axios';

const Store = (props) => {
  const { page, setPage, userInfo, setUserInfo, storeData, setStoreData, loggedIn, setLoggedIn, currStore, setCurrStore } = useContext(GlobalContext);
  let { name, address, city, state, zip, latitude, longitude, miles_away, store_open, store_close, url, food_tag, tea_tag, coffee_tag } = props.data;

  function getAverageRating(store) {
    let ratings = 0;
    if (Array.isArray(store.reviews) && store.reviews.length > 0) {
      store.reviews.forEach(store => {
        ratings += store.rating;
      })
      return (ratings / store.reviews.length).toFixed(1);
    } else {
      return 0;
    }
  }

  if (props.selected) {
    return (<div className="shop-entry" onClick={{}} style={{ backgroundColor: 'white', paddingLeft: '7px', paddingTop: '7px', background: 'linear-gradient(180deg, #6b5a55 86%, #00ffff00 50%)' }}>
      <div style={{ color: 'white' }}>{name}</div>
      <div className="rating">
        <div style={{ marginRight: '10px', color: '#fff' }}>{getAverageRating(props.data)}</div>
        <div style={{ color: '#FFCF2E' }}>{'★'.repeat(Math.floor(getAverageRating(props.data)))}</div>
      </div>
      <div style={{ color: '#ffffffa6' }}>{miles_away} Miles from your location.</div>
      <div className="tags">
        {coffee_tag ? <div className="tag" display="active">COFEE</div>:<div className="tag" display="none">COFEE</div>}
        {tea_tag ? <div className="tag" display="active">TEA</div>:<div className="tag" display="none">TEA</div>}
        {food_tag ? <div className="tag" display="active">FOOD</div>:<div className="tag" display="none">FOOD</div>}
      </div>
      <hr style={{ border: '1px solid rgb(190, 166, 159)' }} />
    </div>)
  } else {
    return (<div className="shop-entry">
      <div style={{ color: 'white' }}>{name}</div>
      <div className="rating">
        <div style={{ marginRight: '10px', color: '#fff' }}>{getAverageRating(props.data)}</div>
        <div style={{ color: '#FFCF2E' }}>{'★'.repeat(Math.floor(getAverageRating(props.data)))}</div>
      </div>
      <div style={{ color: '#ffffffa6' }}>{miles_away} Miles from your location.</div>
      <div className="tags">
        {coffee_tag === 1 ? <div className="tag" display="active">COFEE</div>:<div className="tag" style={{display:"none"}}>COFEE</div>}
        {tea_tag === 1 ? <div className="tag" display="active">TEA</div>:<div className="tag" style={{display:"none"}}>TEA</div>}
        {food_tag === 1 ? <div className="tag" display="active">FOOD</div>:<div className="tag" style={{display:"none"}}>FOOD</div>}
      </div>
      <hr style={{ border: '1px solid rgb(190, 166, 159)' }} />
    </div>)
  }
}
export default Store;