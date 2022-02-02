// import our db info
const db = require("./index.js");



// controller functions to format get/post requests and pass them along to our db
const controllers = {

  getStoreReviewData(req, res) {
    console.log('received a new GET request');
    console.log('body:::', req.body)
    console.log('params:::', req.params)
    console.log('query::::', req.query)
    const { store_id } = req.params
    let queryString = `SELECT * FROM reviews WHERE store_id=${store_id}`;

    db.query(queryString, (err, data) => {
      if (err) {
        res.status(404).send();
      } else {
        res.status(200).send(data);
      }
    });
  },

  getUserReviewData(req, res) {
    console.log('received a new GET request');
    console.log('body:::', req.body)
    console.log('params:::', req.params)
    console.log('query::::', req.query)
    const { user_id } = req.params
    let queryString = `SELECT * FROM reviews WHERE user_id=${user_id}`;

    db.query(queryString, (err, data) => {
      if (err) {
        res.status(404).send();
      } else {
        res.status(200).send(data);
      }
    });
  },

  // getReviews(req, res) {
  //   const { store_id } = req.params
  //   let queryString = `SELECT * FROM reviews WHERE store_id=${store_id}`
  //   db.query(queryString, (err, data) => {
  //     err ? res.status(404).send() : res.status(200).send(data)
  //   })
  // },

  getStores(req, res) {
    let queryString = 'SELECT * FROM stores'
    db.query(queryString, (err, data) => {
      err ? res.status(404).send() : res.status(200).send(data)
    })
  },

  getUsers(req, res) {
    let queryString = `SELECT * FROM users`
    db.query(queryString, (err, data) => {
      err ? res.status(400).send() : res.status(201).send(data)
    })
  },

  postSomeData(req, res) {
    console.log('received a new POST request');
    let queryString = 'INSERT INTO reviews (col_1, col_2, col_3) VALUES (?, ?, ?)';
    let queryArgs = [req.body.user_id, req.body.text, req.body.roomname, req.body.createdAt];

    db.query(queryString, queryArgs, (err, dbRes) => {
      if (err) {
        res.status(404).send();
      } else {
        res.status(201).send();
      }
    });

  },



};

module.exports = controllers;