// import mysql
const mysql = require('mysql2');
require('dotenv').config();

// create a connection to the db
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'early_bird'
});

// actually connect
connection.connect( (err) => {
  if (err) {
    console.log('there was an error connecting to the database', err);
  } else {
    console.log('successfully connected to the db from the server');
  }

});

module.exports = connection;