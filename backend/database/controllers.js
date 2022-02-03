// import stuff
const db = require("./index.js");
require('dotenv').config();
const axios = require('axios');
const bcrypt = require('bcrypt');
const saltRounds = 10;



// controller functions to format get/post requests and pass them along to our db
const controllers = {

  // ================================================================
  // GET REQUESTS
  // ================================================================


  getStoreDetails(req, res) {
    console.log('received a new GET request to getStoreDetails');

  },

  getStoreReviews(req, res) {
    let { id } = req.params;
    let queryString = 'SELECT r.id, u.username, r.rating, r.body, r.date FROM reviews r, users u WHERE r.store_id = ? AND u.id = r.user_id';
    let queryArgs = [id];
    db.query(queryString, queryArgs, (err, dbRes) => {
      if (err) {
        console.log('there was an error fetching review data')
        res.status(404).send(err);
      } else {
        res.status(201).send(dbRes);
      }
    });
  },

  getStoreProducts(req, res) {
    console.log('received a new GET request to getStoreProducts');

  },

  getNearbyStores(req, res) {
    console.log('received a new GET request to getNearbyStores');

  },

  getProductDetails(req, res) {
    console.log('received a new GET request to getProductDetails');

  },

  getUserDetails(req, res) {
    let { username, password } = req.params;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, response) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      };

      console.log(response);
      let hashedPass = response[0].password;
      bcrypt.compare(password, hashedPass, function(err, result) {
        if (result) {
          res.send(response);
        } else {
          res.send(false);
        }
      });
    })
  },

  // ================================================================
  // POST REQUESTS
  // ================================================================

  addNewUser(req, res) {
    console.log('received a new POST request to addNewUser');

    //implement latitude, longitude
    let {username, password, email, street_address, city, state, zip, reward_points} = req.body;
    // password encrypt function
    bcrypt.hash(password, saltRounds, function(err, hash) {
      console.log(hash);
      db.query('INSERT INTO users (username, password, email, street_address, city, state, zip, reward_points, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [username, hash, email, street_address, city, state, zip, reward_points, 1, 1], (err, response) => {
        if (err) {
          console.log(err);
        } else {
          console.log('complete')
          res.sendStatus(201);
        }
      })
    });

    // In this example, “myPlaintextPassword” would be the password that is sent up in the URL params or request body.
    // The hash argument in the callback function is the result of your hashed password. The hashed variable is what you want to store in the database.





    // let queryString = 'INSERT INTO reviews (col_1, col_2, col_3) VALUES (?, ?, ?)';
    // let queryArgs = [req.body.user_id, req.body.text, req.body.roomname, req.body.createdAt];

    // db.query(queryString, queryArgs, (err, dbRes) => {
    //   if (err) {
    //     res.status(404).send();
    //   } else {
    //     res.status(201).send();
    //   }
    // });
  },

  addNewReview(req, res) {
    console.log('received a new POST request to addNewReview');
    let queryString = 'INSERT INTO reviews (col_1, col_2, col_3) VALUES (?, ?, ?)';
    let queryArgs = [req.body.user_id, req.body.text, req.body.roomname, req.body.createdAt];

    // db.query(queryString, queryArgs, (err, dbRes) => {
    //   if (err) {
    //     res.status(404).send();
    //   } else {
    //     res.status(201).send();
    //   }
    // });

  },

  addNewStore(req, res) {
    console.log('received a new POST request to addNewStore');

    const lat = req.body.location.latitude;
    const lng = req.body.location.longitude;

    axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`)
      .then(({ data }) => {

        const name = req.body.name;
        const address = data.results[0].formatted_address;
        const latitude = JSON.stringify(req.body.location.latitude);
        const longitude = JSON.stringify(req.body.location.longitude);
        const miles_away = JSON.stringify(req.body.location.milesAway);
        const store_open = req.body.open;
        const store_close = req.body.close;
        const url = `http://www.${name.split(' ').join('')}.com`;
        const featured_food = JSON.stringify(req.body.featuredFood);
        const featured_drinks = JSON.stringify(req.body.featuredDrinks);
        const food_tag = req.body.foodTag;
        const tea_tag = req.body.teaTag;
        const coffee_tag = req.body.coffeeTag;

        let queryString = 'INSERT INTO stores (name, address, latitude, longitude, miles_away, store_open, store_close, url, featured_foods, featured_drinks, food_tag, tea_tag, coffee_tag) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let queryArgs = [name, address, latitude, longitude, miles_away, store_open, store_close, url, featured_food, featured_drinks, food_tag, tea_tag, coffee_tag];

        db.query(queryString, queryArgs, (err, dbRes) => {
          if (err) {
            res.status(404).send(err);
          } else {
            res.status(201).send();
          }
        });

      })
      .catch((err) => {
        console.log('there was an error fetching google address API data', err)
      });
  },



  // ================================================================
  // PUT REQUESTS
  // ================================================================

  updateUserRewardsPoints(req, res) {
    console.log('received a new PUT request to updateUserRewardsPoints');

  },

  updateUserInformation(req, res) {
    console.log('received a new PUT request to updateUserInformation');

  },



};

module.exports = controllers;