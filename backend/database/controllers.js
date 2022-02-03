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

  // get all information on a single store
  getStoreDetails(req, res) {

    let { id } = req.params;

    let queryString = 'SELECT * FROM stores WHERE id = ?';
    let queryArgs = [id];

    db.query(queryString, queryArgs, (err, dbRes) => {
      if (err) {
        console.log('there was an error fetching store data')
        res.status(404).send(err);
      } else {
        res.status(201).send(dbRes[0]);
      }
    });
  },

  // get all reviews for a single store
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

  getStoreMenu(req, res) {

    const { id } = req.params;

    // get the menu id of the store
    db.query('SELECT menu_id FROM stores WHERE id = ?', [id], (err, dbRes) => {
      if (err) {
        console.log('there was an error fetching store menu');
        res.status(404).send(err);
      } else {

        // get all the products on that menu
        db.query(`SELECT * FROM products WHERE menu_categories LIKE '%${dbRes[0].menu_id}%'`, (err, dbRes2) => {
          if (err) {
            console.log('there was an error fetching store menu');
            res.status(404).send(err);
          } else {
            res.status(200).send(dbRes2);
          }
        });
      }
    });

  },

  getNearbyStores(req, res) {

    const { zip } = req.params;
    const trimmedZip = zip.slice(0, -1);

    let queryString = `SELECT * FROM stores WHERE address LIKE "%${trimmedZip}%"`;
    let queryArgs = [trimmedZip];

    db.query(queryString, queryArgs, (err, dbRes) => {
      if (err) {
        console.log('there was an error getting nearby stores');
        res.status(404).send(err);
      } else {

        // iterate through list of nearby stores
        for (let i = 0; i < dbRes.length; i++) {

          let queryString = 'SELECT r.id, u.username, r.rating, r.body, r.date FROM reviews r, users u WHERE r.store_id = ? AND u.id = r.user_id';
          let queryArgs = [dbRes[i].id];

          // get the reviews for a store and attach to the store obj
          db.query(queryString, queryArgs, (err, dbRes2) => {
            if (err) {
              console.log('there was an error fetching review data within getNearbyStores')
              res.status(404).send(err);
            } else {
              dbRes[i].reviews = dbRes2;
            }
          });
        }

        // after reviews have been added to each nearby store, return the data in the http response
        // **NOTE: setTimeout() is used to give queries in for-loop above time to finish. ya, it's a bad solution, but its almost 1:00am and i'm fkn tired.
        setTimeout(() => { res.status(200).send(dbRes) }, 500);
      }
    });
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

      if (response.length > 0) {
        let hashedPass = response[0].password;
        bcrypt.compare(password, hashedPass, function (err, result) {
          if (result) {
            res.send(response);
          } else {
            res.send(false);
          }
        });
      } else {
        res.send(false);
      }
    })
  },

  // ================================================================
  // POST REQUESTS
  // ================================================================

  addNewUser(req, res) {
    console.log('received a new POST request to addNewUser');

    //implement latitude, longitude
    let { username, password, email, street_address, city, state, zip, reward_points } = req.body;
    // password encrypt function
    bcrypt.hash(password, saltRounds, function (err, hash) {

      // get lat, lng from user address
      axios
        .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${street_address},+${city},+${state}&key=${process.env.GOOGLE_API_KEY}`)
        .then( ({data}) => {

          let {lat, lng} = data.results[0].geometry.location;

          db.query('INSERT INTO users (username, password, email, street_address, city, state, zip, reward_points, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [username, hash, email, street_address, city, state, zip, reward_points, lat, lng], (err, response) => {
            if (err) {
              console.log(err);
            } else {
              console.log('user added');
              res.sendStatus(201);
            }
          });

        })
        .catch('there was an error getting lat-long data in addNewUser');

    });

  },

  addNewReview(req, res) {

    let queryString = 'INSERT INTO reviews (user_id, store_id, rating, body) VALUES (?, ?, ?, ?)';
    let queryArgs = [req.body.userId, req.body.storeId, req.body.rating, req.body.body];

    db.query(queryString, queryArgs, (err, dbRes) => {
      if (err) {
        console.log('there was an error adding a new review');
        res.status(404).send(err);
      } else {
        res.status(201).send();
      }
    });

  },

  // create a new store entry along with reviews
  addNewStore(req, res) {

    const lat = req.body.location.latitude;
    const lng = req.body.location.longitude;
    // generate an address for the store using google api
    axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`)
      .then(({ data }) => {
        const name = req.body.name;
        const address = data.results[0].formatted_address;
        const latitude = JSON.stringify(req.body.location.latitude);
        const longitude = JSON.stringify(req.body.location.longitude);
        const miles_away = req.body.location.milesAway;
        const store_open = req.body.open;
        const store_close = req.body.close;
        // const url = `http://www.${name.split(' ').join('')}.com`;
        const url = `http://www.${name}.com`;
        const featured_food = JSON.stringify(req.body.featuredFood);
        const featured_drinks = JSON.stringify(req.body.featuredDrinks);
        const food_tag = req.body.foodTag;
        const tea_tag = req.body.teaTag;
        const coffee_tag = req.body.coffeeTag;
        const reviews = req.body.reviews;

        // generate a menu number based on coffee, tea, food tags
        // menu 11-13 -- coffee, tea, food // menu 14-16 -- coffee, tea // menu 17-19 -- coffee, food
        let menu_id = 1;

        if (coffee_tag && tea_tag && food_tag) {
          menu_id = Math.floor(Math.random() * 3 + 11);
        } else if (coffee_tag && tea_tag) {
          menu_id = Math.floor(Math.random() * 3 + 14);
        } else if (coffee_tag && food_tag) {
          menu_id = Math.floor(Math.random() * 3 + 17);
        };

        let queryString = 'INSERT INTO stores (name, address, latitude, longitude, miles_away, store_open, store_close, url, featured_foods, featured_drinks, food_tag, tea_tag, coffee_tag, menu_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let queryArgs = [name, address, latitude, longitude, miles_away, store_open, store_close, url, featured_food, featured_drinks, food_tag, tea_tag, coffee_tag, menu_id];

        // add the store to the database
        db.query(queryString, queryArgs, (err, dbRes) => {
          if (err) {
            console.log('there was an error creating a new store entry', err)
            res.status(404).send(err);
          } else {


            // once store has been added, get the id of the store that was added (to post reviews) and all other data (to return in responses)
            db.query('SELECT * FROM stores WHERE name = ?', [name], (err, dbRes) => {
              if (err) {
                console.log('there was an error getting the store id within the addNewStore function');
                res.status(404).send(err);
              } else {

                let store_data = dbRes[0];

                // loop through included reviews and add them to the db
                for (let i = 0; i < reviews.length; i++) {

                  let queryString2 = 'INSERT INTO reviews (user_id, store_id, rating, body) VALUES (?, ?, ?, ?)';
                  let queryArgs2 = [reviews[i].reviewerName, store_data.id, reviews[i].starRating, reviews[i].reviewerText];

                  db.query(queryString2, queryArgs2, (err, dbRes2) => {
                    if (err) {
                      console.log('there was an error posting reviews within the addNewStore function');
                      res.status(404).send(err);
                    }
                  });
                }

                // gather all the reviews (with usernames) associated with the store to return
                let queryString3 = 'SELECT r.id, u.username, r.rating, r.body, r.date FROM reviews r, users u WHERE r.store_id = ? AND r.user_id = u.id';
                let queryArgs3 = [store_data.id];
                db.query(queryString3, queryArgs3, (err, dbRes3) => {
                  if (err) {
                    console.log('there was an error fetching reviews within the addNewStore function');
                    res.status(404).send(err);
                  } else {
                    store_data.reviews = dbRes3;
                    res.status(200).send(store_data);
                  }
                });

              }
            });

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
    const { id, reward_points } = req.body;
    const queryString = `UPDATE users SET reward_points = ? WHERE id = ?`;
    const queryArgs = [reward_points, id]
    db.query(queryString, queryArgs, (err, dbRes) => {
      if (err) {
        console.log('there was an error adding updating user points');
        res.status(404).send(err);
      } else {
        res.status(201).send(dbRes);
      }
    })
  },

  updateUserInformation(req, res) {
    console.log('received a new PUT request to updateUserInformation');
    const { id, username, street_address, city, state, zip } = req.body;

    const queryString = `
      UPDATE users SET
        username = ?,
        street_address = ?,
        city = ?, state = ?,
        zip = ?
        WHERE id = ?`;
    const queryArgs = [username, street_address, city, zip, id]
    db.query(queryString, queryArgs, (err, dbRes) => {
      if (err) {
        console.log('there was an error adding updating user information');
        res.status(404).send(err);
      } else {
        res.status(201).send(dbRes);
      }
    })
  },


};

module.exports = controllers;