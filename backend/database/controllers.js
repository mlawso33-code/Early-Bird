// import our db info
const db = require("./index");


// controller functions to format get/post requests and pass them along to our db
const controllers = {

  getSomeData(req, res) {
    console.log('received a new GET request');
    let queryString = 'SELECT * FROM table_name';

    db.query(queryString, (err, data) => {
      if (err) {
        res.status(404).send();
      } else {
        res.status(200).send(data);
      }
    });
  },

  postSomeData(req, res) {
    console.log('received a new POST request');
    let queryString = 'INSERT INTO table_name (col_1, col_2, col_3) VALUES (?, ?, ?)';
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