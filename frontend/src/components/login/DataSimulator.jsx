import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';
import Axios from 'axios';

const DataSimulator = () => {
  //These aren't real states, yet. Ideally these state will reference an object that
  //contains a user's address and the current store data attached to that address
  const {userInfo, setUserInfo, storeData, setStoreData} = useContext(MainContext);



  useEffect(() => {
    Axios.get(`/storeInfo/${userInfo.address}`).catch((err) => {
      console.log('There was an error processing this request.');
      console.log('Error: ', err);
    })
    .then((result) => {
      setStoreData(result);
    })
  });

  //Array of possible store names to select from
  let storeNamesBank = ['Sunbucks', 'Moon Brews', 'Moose Coffee', 'Poor Java', 'Ben Cunninghams', 'Savor the Sip', 'Zees', "True Man's Beans", 'CoCoFee', 'Moca Marc'];

  //Object of possible featured itmes to select from
  let featuredItemsBank = {
    food: ['Club Croissant', 'Super Scone', "Early Riser's Salad", 'Chocolate Mighty Muffin', 'Oatmeal Oasis', 'Dynamic Danish Pastry', 'Papa Pastry', 'Gran-Gran Muffin'],
    drinks: ['Super Cinnamon Swirl', 'Caffeine Express', 'Wake Up!', 'Affogato', 'Kaffeost', "Witch's Cold Brew", 'Snickerdoodle Latte', 'Happy Birthday Shake', 'Turn-Up Tea', 'Chocomite', 'ZOOM']
  }

  //Create new simulated data for this user's location
  let createSimulatedStoreData = function() {
    let numberOfLocalStores = Math.floor((Math.random() * 5) + 5);
    
    for (let i = 0; i < numberOfLocalStores; i++) {
      let simulatedStore = {
        storeName: '',
        location: [],
        featuredFood: '',
        featuredDrinks: ''
      };

      simulatedStore.storeName = createSimulatedStoreName();
      simulatedStore.location = createSimulatedLocation();
      simulatedStore.featuredFood = createSimulatedFeaturedFood();
      simulatedStore.featuredDrinks = createSimulatedFeaturedDrinks();
    }
  };

  //Returns a random store name to the createSimulatedStoreData function
  let createSimulatedStoreName = function() {
    return storeNamesBank[Math.floor(Math.random() * 10)];
  }

  //Returns a random store location to the createSimulatedStoreData function
  let createSimulatedLocation = function() {

  }

  //Returns an array of random featured foods to the createSimulatedStoreData function
  let createSimulatedFeaturedFood = function() {

  }

  //Returns an array of random featured drinks to the createSimulatedStoreData function
  let createSimulatedFeaturedDrinks = function() {

  }

  //Check to see if there's data for this user's location
  if (storeData === 'No saved data for this location') {
    createSimulatedStoreData();
  }
}

export default DataSimulator;