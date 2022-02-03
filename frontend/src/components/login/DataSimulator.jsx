import axios from 'axios';

let DataSimulator = function (userInfo) {
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
    open: ['06:00:00', '07:00:00', '08:00:00'],
    close: ['20:00:00', '21:00:00', '22:00:00']
  }

  //Object of possible reviewer names and review messages
  let reviewsBank = {
    goodReviews: ['This place was fantastic!', 'Love getting coffee here.', 'Super cool patio out back', 'I come here almost every day (:', 'This is where you go when you need to wake up in the morning!!!', "I can't wait to see what new menu items they add next!", 'The staff were so friendly', 'Already dreaming about my next coffee', 'So. Freaking. Good!', "I can't believe how close this coffee shop is to me!", "AMAZING AMAZING AMAZING!!", "I wake up everyday, and thank God this shop was made. The coffee here kicks like a horse while still tasting amazing!", "I will certainly be raising my children to love this store as much as I do.", "The level of compassion and patience that worker Goku-Son gave to me was beyond expectations. He asked to fight though, which was weird.", "The coffee slaps!!!", "I hope they stay up forever. What an amazing local shop!", "Revolutionary!!!"],
    badReviews: ['I expected so much more', 'Good, but not my favorite', 'My coffee was so cold!', 'They really need to offer more menu items', "I wish my tea wasn't so plain, I asked for more sugar but I don't think they understood", "Disappointed at the service provided by the worked SugarBee, she treated me like just another person and didn't have any spark in her pep today", "My tea was mediocre...", "The coffee was bland, staff was bland. Never coming again!", "Where did they get these muffins??? Taste like Walmart", "I don't mind this shop, but I dont know if i can keep going"]
  }

  //Create new simulated data for this user's location
  let createSimulatedStoreData = async function () {
    let coffeeStoreCollection = [];
    let numberOfLocalStores = Math.floor((Math.random() * 5) + 5);

    for (let i = 0; i < numberOfLocalStores; i++) {
      let simulatedStore = {
        name: '',
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
        teaTag: false,
        reviews: []
      };

      //Build pieces of individual simulated store 
      simulatedStore.name = createSimulatedStoreName();
      simulatedStore.open = createOpenTime();
      simulatedStore.close = createCloseTime();
      simulatedStore.location = createSimulatedLocation();
      let foodAndTags = createSimulatedFeaturedFood();
      simulatedStore.featuredFood = foodAndTags[0];
      simulatedStore.foodTag = foodAndTags[1];
      let drinksAndTeaTag = createSimulatedFeaturedDrinks();
      simulatedStore.featuredDrinks = drinksAndTeaTag[0];
      simulatedStore.teaTag = drinksAndTeaTag[1];
      simulatedStore.reviews = createSimulatedReviews();

      coffeeStoreCollection.push(simulatedStore);
    }

    let data = [];
    coffeeStoreCollection.forEach(async store => {
      let result = await axios.post('/store/details', store)
        .catch((err) => {
          console.log('There was an error processing this request.');
          console.log('Error: ', err);
        });

      data.push(result.data);
    });
    return data;
  };

  //Returns a random store name to the createSimulatedStoreData function
  let createSimulatedStoreName = function () {
    return storeNamesBank[Math.floor(Math.random() * storeNamesBank.length)];
  }

  //Returns a random opening time to the createSimulatedStoreData function
  let createOpenTime = function () {
    return storeHoursBank.open[Math.floor(Math.random() * 3)];
  }

  //Returns a random closing time to the createSimulatedStoreData function
  let createCloseTime = function () {
    return storeHoursBank.close[Math.floor(Math.random() * 3)];
  }

  //Returns a random store location to the createSimulatedStoreData function
  let createSimulatedLocation = function () {
    //User Information pulled from state
    let userLat = userInfo.latitude;
    let userLon = userInfo.longitude;

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
      milesAway: miles.toFixed(2)
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
    if (featuredFoods[0].length > 0) {
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
    if (featuredDrinks[0].indexOf('Turn-Up Tea') !== -1) {
      featuredDrinks[1] = true;
    }

    return featuredDrinks;
  }

  //Returns and array of objects containing randomized user reviews
  let createSimulatedReviews = function () {
    let storeReviews = [];
    let numberOfReviews = (Math.floor(Math.random() * 5)) + 8;

    for (let i = 0; i <= numberOfReviews; i++) {
      let individualReview = {
        reviewerName: '',
        starRating: '',
        reviewerText: ''
      }

      individualReview.reviewerName = (Math.floor(Math.random() * 5)) + 1;
      individualReview.starRating = Math.floor(Math.random() * 6);
      if (individualReview.starRating <= 2) {
        individualReview.reviewerText = reviewsBank.badReviews[Math.floor(Math.random() * reviewsBank.badReviews.length)];
      } else {
        individualReview.reviewerText = reviewsBank.goodReviews[Math.floor(Math.random() * reviewsBank.goodReviews.length)];
      }

      storeReviews.push(individualReview);
    }

    return storeReviews;
  }

  //Return simulated data
  return createSimulatedStoreData();
}

export default DataSimulator;