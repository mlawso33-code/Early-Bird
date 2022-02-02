// import our db info
const db = require("./index.js");



// controller functions to format get/post requests and pass them along to our db
const controllers = {

  // ================================================================
  // GET REQUESTS
  // ================================================================

  getStoreDetails(req, res) {
    console.log('received a new GET request to getStoreDetails');

  },

  getStoreReviews(req,res) {
    console.log('received a new GET request to getStoreReviews');

  },

  getStoreProducts(req,res) {
    console.log('received a new GET request to getStoreProducts');

  },

  getNearbyStores(req,res) {
    console.log('received a new GET request to getNearbyStores');

  },

  getProductDetails(req,res) {
    console.log('received a new GET request to getProductDetails');

  },

  getUserDetails(req,res) {
    console.log('received a new GET request to getUserDetails');

  },


  // ================================================================
  // POST REQUESTS
  // ================================================================

  addNewUser(req, res) {
    console.log('received a new POST request to addNewUser');
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



  // ================================================================
  // PUT REQUESTS
  // ================================================================

  updateUserRewardsPoints(req,res) {
    console.log('received a new PUT request to updateUserRewardsPoints');

  },

  updateUserInformation(req,res) {
    console.log('received a new PUT request to updateUserInformation');

  },



};

module.exports = controllers;