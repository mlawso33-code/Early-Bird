import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';
import Axios from 'axios';

const DataSimulator = () => {
  //These aren't real states, yet. Ideally these state will reference an object that
  //contains a user's address and the current store data attached to that address
  const { userInfo, setUserInfo, storeData, setStoreData } = useContext(MainContext);

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
  let createSimulatedStoreData = function () {
    let coffeeStoreCollection = [];
    let numberOfLocalStores = Math.floor((Math.random() * 5) + 5);

    for (let i = 0; i < numberOfLocalStores; i++) {
      let simulatedStore = {
        storeName: '',
        location: {
          latitude: '',
          longitude: '',
          milesAway: ''
        },
        featuredFood: [],
        featuredDrinks: []
      };

      simulatedStore.storeName = createSimulatedStoreName();
      simulatedStore.location = createSimulatedLocation();
      simulatedStore.featuredFood = createSimulatedFeaturedFood();
      simulatedStore.featuredDrinks = createSimulatedFeaturedDrinks();

      coffeeStoreCollection.push(simulatedStore);
    }

    setStoreData(coffeeStoreCollection);

    Axios.post(`/storeInfo/${userInfo.address}`)
      .catch((err) => {
        console.log('There was an error processing this request.');
        console.log('Error: ', err);
      }).then(() => {
        console.log('Coffee stores have been updated for this location!');
      })
  };

  //Returns a random store name to the createSimulatedStoreData function
  let createSimulatedStoreName = function () {
    return storeNamesBank[Math.floor(Math.random() * storeNamesBank.length)];
  }

  //Returns a random store location to the createSimulatedStoreData function
  let createSimulatedLocation = function () {
    //User Information pulled from state
    let userLat = userInfo.address.latitude;
    let userLon = userInfo.address.longitude;

    //Define simulated results which will be calculated and returned later
    let simulatedLat;
    let simulatedLon;

    //Set miles to be one greater than the desired radius so that while loop executes
    let miles = 6;

    //Function to calculate how many miles away the store will be
    let findMilesAway = function (lat1, lat2, lon1, lon2) {
      lon1 = lon1 * Math.PI / 180;
      lon2 = lon2 * Math.PI / 180;
      lat1 = lat1 * Math.PI / 180;
      lat2 = lat2 * Math.PI / 180;

      let dlon = lon2 - lon1;
      let dlat = lat2 - lat1;
      let a = Math.pow(Math.sin(dlat / 2), 2)
        + Math.cos(lat1) * Math.cos(lat2)
        * Math.pow(Math.sin(dlon / 2), 2);
      let c = 2 * Math.asin(Math.sqrt(a));

      let r = 6371;

      return (c * r) * 0.62137;
    }

    //While-loop that executes until location produced is within 5 miles
    while (miles > 5) {
      let ranLat = Math.random() * ((userLat) - (userLat - .25)) + (userLat - .25);
      let ranLon = Math.random() * ((userLon) - (userLon - .25)) + (userLon - .25);
      miles = findMilesAway(userLat, ranLat, userLon, ranLon);
      simulatedLat = ranLat;
      simulatedLon = ranLon;
    }

    return {
      latitude: simulatedLat,
      longitude: simulatedLon,
      milesAway: miles
    }
  }

  //Returns an array of random featured foods to the createSimulatedStoreData function
  let createSimulatedFeaturedFood = function () {
    let numberOfFeaturedFoods = Math.floor(Math.random() * 3) + 1;
    let featuredFoods = [];

    for (let i = 0; i < numberOfFeaturedFoods + 1; i++) {
      featuredFoods.push(featuredItemsBank.food[Math.floor(Math.random() * featuredItemsBank.food.length)]);
    }

    for (let i = 0; i < featuredFoods.length; i++) {
      if (featuredFoods.indexOf(i, i) !== -1) {
        featuredFoods.splice(featuredFoods.indexOf(i, i), 1);
      }
    }

    return featuredFoods;
  }

  //Returns an array of random featured drinks to the createSimulatedStoreData function
  let createSimulatedFeaturedDrinks = function () {
    let numberOfFeaturedDrinks = Math.floor(Math.random() * 3) + 1;
    let featuredDrinks = [];

    for (let i = 0; i < numberOfFeaturedDrinks + 1; i++) {
      featuredDrinks.push(featuredItemsBank.drinks[Math.floor(Math.random() * featuredItemsBank.drinks.length)]);
    }

    for (let i = 0; i < featuredDrinks.length; i++) {
      if (featuredDrinks.indexOf(i, i) !== -1) {
        featuredDrinks.splice(featuredDrinks.indexOf(i, i), 1);
      }
    }

    return featuredDrinks;
  }

  //Check to see if there's data for this user's location
  if (storeData === 'No saved data for this location') {
    createSimulatedStoreData();
  }
}

export default DataSimulator;