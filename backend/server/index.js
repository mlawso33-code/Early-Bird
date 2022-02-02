// import express, db info, controllers
const express = require('express');
const db = require('../database/index.js');
const controllers = require('../database/controllers.js');
require("babel-core/register");
require("babel-polyfill");
const path = require('path')

// create express app
const app = express();

// set our port
const PORT = 3000;

// returns a function that will go and get static files from our filesystem and serve them
app.use('/', express.static(__dirname + '/../../frontend/dist'));


// need to use json() middleware so express can parse get/post data
app.use(express.json());

// get request routes
app.get('/stores/:id/details', controllers.getStoreDetails);
app.get('/stores/:id/reviews', controllers.getStoreReviews);
app.get('/stores/:id/products', controllers.getStoreProducts);
app.get('/stores/nearby', controllers.getNearbyStores);
app.get('/product/:id', controllers.getProductDetails);
app.get('/user/:id', controllers.getUserDetails);

// post request routes
app.post('/user', controllers.addNewUser);
app.post('/user/review', controllers.addNewReview);
app.post('/store/details', controllers.addNewStore);

// put request routes
app.put('/user/rewards', controllers.updateUserRewardsPoints);
app.put('/user/details', controllers.updateUserInformation);


// catch any get requests that don't have valid route
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})


// listen for get/post requests
app.listen(PORT, () => {
  console.log('listening on port', PORT, '...');
});