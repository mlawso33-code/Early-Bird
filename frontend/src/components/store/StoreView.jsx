import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';

const StoreView = () => {
  const { page, setPage } = useContext(GlobalContext);

  return (
    <div className="wrapper" style={{height: '100%', width: '100%'}}>
      <img src="LOGO.png" className="logo"/>
      <div className="nav-bar"></div>
      <div className="portal-container" style={{height: '100%', width: '100%', fontFamily: 'neue-haas-grotesk-display'}}>
        <div className="shops-module">
          <div style={{color: 'white', fontWeight: 'bold', fontSize: '25px', fontFamily: 'poppins, sans-serif'}}>RESULTS FROM <span className="location-style" style={{fontWeight: 'normal', color: '#D2B48C'}}>NEW YORK, NEW YORK</span></div>
          <div className="shop-container">
            <div className="shop-entry" style={{backgroundColor: 'white', paddingLeft: '7px', paddingTop: '7px', background: 'linear-gradient(180deg, #6b5a55 86%, #00ffff00 50%)'}}>
              <div style={{color: 'white'}}>COFFEE SHOP</div>
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
            </div>
            <div className="shop-entry">
              <div style={{color: 'white'}}>COFFEE SHOP</div>
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
              <hr style={{color: 'white', width: '100%', paddingLeft: '0px'}} />
            </div>
            <div className="shop-entry">
              <div style={{color: 'white'}}>COFFEE SHOP</div>
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
            </div>
            <div className="shop-entry">
              <div style={{color: 'white'}}>COFFEE SHOP</div>
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
            </div>
          </div>
        </div>
        <div className="shop-info">
          <div className="details">
            <div className="column-a">
              <div className="shop-website">
                <div style={{color: 'white', fontSize: '30px', marginRight: '14px'}}>COFFEE SHOP</div>
                <div style={{fontSize: '12px', color: 'white'}}>Visit Website</div>
              </div>
              <div style={{color: '#D2B48C'}}>MON-FRI 09:00 AM - 07:00 PM</div>
              <div className="featured" style={{marginTop: '10px'}}>
                <div style={{color: 'white', fontSize: '30px'}}>Featured Items</div>
                <hr className="hr" style={{color: '#BEA69F', margin: '1px', size: '3px', width: '97%'}}/>
                <div className="featured-items" style={{display: 'flex', flexDirection: 'row', flexjustifyContent: 'flex-start'}}>
                  <div className="featured-item">Item</div>
                  <div className="featured-item">Item</div>
                  <div className="featured-item">Item</div>
                </div>
              </div>
            </div>
            <div className="column-b">
              Google Map
            </div>
          </div>
          <div className="reviews">
            <div className="reviews-header">
              <div style={{fontSize: '30px', color: 'white', marginRight: '16px'}}>Reviews</div>
              <div style={{display: 'flex', alignItems: 'flex-end', height: '32px'}}>
                <div style={{marginRight: '4px', color: 'rgb(199 197 197)', fontSize: '20px'}}>5.0</div>
                <div style={{color: 'rgb(255, 207, 46)', fontSize: '17px'}}>★★★★★</div>
                <div style={{fontSize: '15px', marginRight: '10px', height: '20px', marginLeft: '3px', color: 'rgb(201 199 199)'}}>(14)</div>
              </div>
            </div>
            <hr className="hr"/>
            <div>
              <input className="review-input"/>
              <button className="review-button">Post</button>
            </div>
            <div className="reviews">
              <div className="review" style={{background: '#ffffff2e', borderRadius: '21px', padding: '15px', marginTop: '12px'}}>
                <div className="review-header" style={{marginBottom: '6px'}}>
                  <div style={{color: 'white', marginRight: '5px', marginLeft: '10px'}}>Janie Smith</div>
                  <div style={{color: 'rgb(255, 207, 46)', fontSize: '12px'}}>★★★★★</div>
                </div>
                <div className="review-comment" style={{color: 'white', fontSize: '12px', marginLeft: '10px'}}>
                  Great customer service! They had my coffee out in just a couple minutes!
                </div>
              </div>
              <div className="review" style={{background: '#ffffff2e', borderRadius: '21px', padding: '15px', marginTop: '12px'}}>
                <div className="review-header" style={{marginBottom: '6px'}}>
                  <div style={{color: 'white', marginRight: '5px', marginLeft: '10px'}}>John Doe</div>
                  <div style={{color: 'rgb(255, 207, 46)', fontSize: '12px'}}>★★★★★</div>
                </div>
                <div className="review-comment" style={{color: 'white', fontSize: '12px', marginLeft: '10px'}}>
                  Great customer service! They had my coffee out in just a couple minutes!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default StoreView;