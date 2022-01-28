// import mysql
const mysql = require('mysql2');

// create a connection to the db
const connection = mysql.createConnection({
  host: 'FILL_THIS_IN',
  port: 3306,
  user: 'FILL_THIS_IN',
  password: 'FILL_THIS_IN',
  database: 'FILL_THIS_IN'
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