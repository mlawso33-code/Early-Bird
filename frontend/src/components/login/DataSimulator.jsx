import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from '../../contexts/context.js';
import Axios from 'axios';

let DataSimulator = function (dataAlreadyExists) {
  //This function assumes: access to user latitude and longitude, a state to set store info to, multiple routes to handle information being saved
  //open and close times need to be added


  //These aren't real states, yet. Ideally these state will reference an object that
  //contains a user's address and the current store data attached to that address
  const { userInfo, setUserInfo, storeData, setStoreData } = useContext(MainContext);

  //Array of possible store names to select from
  let storeNamesBank = ['Sunbucks', 'Moon Brews', 'Moose Coffee', 'Poor Java', 'Ben Cunninghams', 'Savor the Sip', 'Zees', "True Man's Beans", 'CoCoFee', 'Moca Marc'];

  //Object of possible featured itmes to select from
  let featuredItemsBank = {
    food: ['Club Croissant', 'Super Scone', "Early Riser's Salad", 'Chocolate Mighty Muffin', 'Oatmeal Oasis', 'Dynamic Danish Pastry', 'Papa Pastry', 'Gran-Gran Muffin'],
    drinks: ['Super Cinnamon Swirl', 'Caffeine Express', 'Wake Up!', 'Affogato', 'Kaffeost', "Witch's Cold Brew", 'Snickerdoodle Latte', 'Happy Birthday Shake', 'Turn-Up Tea', 'Chocomite', 'ZOOM']
  }

  //Object of possible opening and closing times to select from
  //Opening times are assumed to be in the a.m. and closing times are assumed to be in the p.m.
  let storeHoursBank = {
    open: [6, 7, 8],
    close: [8, 9, 10]
  }

  //Create additional banks for preset food, coffee, and tea menus with item prices for later use in storeView component
  ///////////////////
  

  //Create new simulated data for this user's location
  let createSimulatedStoreData = function () {
    let coffeeStoreCollection = [];
    let numberOfLocalStores = Math.floor((Math.random() * 5) + 5);

    for (let i = 0; i < numberOfLocalStores; i++) {
      let simulatedStore = {
        storeName: '',
        open: '',
        close: '',
        location: {
          latitude: '',
          longitude: '',
          milesAway: ''
        },
        featuredFood: [],
        featuredDrinks: [],
        foodTag: false,
        coffeeTag: true,
        teaTag: false
      };

      simulatedStore.storeName = createSimulatedStoreName();
      simulatedStore.open = createOpenTime();
      simulatedStore.close = createCloseTime();
      simulatedStore.location = createSimulatedLocation();
      let foodAndTags = createSimulatedFeaturedFood();
      simulatedStore.featuredFood = foodAndTags[0];
      simulatedStore.foodTag = foodAndTags[1];
      let drinksAndTeaTag = createSimulatedFeaturedDrinks();
      simulatedStore.featuredDrinks = drinksAndTeaTag[0];
      simulatedStore.teaTag = drinksAndTeaTag[1];

      coffeeStoreCollection.push(simulatedStore);
    }

    setStoreData(coffeeStoreCollection);

    Axios.post('/store/details', coffeeStoreCollection)
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

  //Returns a random opening time to the createSimulateStoreData function
  let createOpenTime = function () {
    return storeHoursBank.open[Math.floor(Math.random() * 3)];
  }

  //Returns a random closing time to the createSimulateStoreData function
  let createCloseTime = function () {
    return storeHoursBank.close[Math.floor(Math.random() * 3)];
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

  //Returns an array of random featured foods and a boolean representing the food tag to the createSimulatedStoreData function
  let createSimulatedFeaturedFood = function () {
    let numberOfFeaturedFoods = Math.floor(Math.random() * 4);
    let featuredFoods = [[], false];

    for (let i = 0; i < numberOfFeaturedFoods; i++) {
      let foodItem = featuredItemsBank.food[Math.floor(Math.random() * featuredItemsBank.food.length)];
      if (featuredFoods[0].indexOf(foodItem) === -1) {
          featuredFoods[0].push(foodItem);
      }
    }

    //Determine if food tag is true
    if (featuredFoods.length > 0) {
      featuredFoods[1] = true;
    }

    return featuredFoods;
  }

  //Returns an array of random featured drinks and a boolean representing the tea tag to the createSimulatedStoreData function
  let createSimulatedFeaturedDrinks = function () {
    let numberOfFeaturedDrinks = Math.floor(Math.random() * 4);

    let featuredDrinks = [[], false];

    for (let i = 0; i < numberOfFeaturedDrinks; i++) {
      let drinkItem = featuredItemsBank.drinks[Math.floor(Math.random() * featuredItemsBank.drinks.length)];
      if (featuredDrinks[0].indexOf(drinkItem) === -1) {
          featuredDrinks[0].push(drinkItem);
      }
    }

    //Determine if tea tag is true
    let decideTeaTag = Math.floor(Math.random() * 2);
    if (decideTeaTag === 0) {
      featuredDrinks[1] = true;
    }

    //Handle edge case where a featured item is a tea
    if (featuredDrinks.indexOf('Turn-Up Tea') !== -1) {
      featuredDrinks[1] = true;
    }

    return featuredDrinks;
  }

  //Check to see if data needs to be created
  if (!dataAlreadyExists) {
    createSimulatedStoreData();
  } else {
    setStoreData(userInfo.storeData);
  }
}

export default DataSimulator;