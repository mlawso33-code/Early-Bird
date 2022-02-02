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

// get, post, delete request routing
app.get('/api/stores', controllers.getStores)
app.get('/api/users', controllers.getUsers)
// app.get('/api/reviews', controllers.getReviews)
app.get('/api/stores/:store_id/reviews', controllers.getStoreReviewData);
app.get('/api/users/:user_id/reviews', controllers.getUserReviewData)
app.post('/api/stores/reviews', controllers.postSomeData);
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