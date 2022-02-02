/*
// ==============================================
// Database creation
// ==============================================
*/
DROP DATABASE IF EXISTS early_bird;
CREATE DATABASE early_bird;

USE early_bird;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(20) UNIQUE NOT NULL,
  password VARCHAR(75) NOT NULL,
  email VARCHAR(50) NOT NULL,
  street_address VARCHAR(100) NOT NULL,
  city VARCHAR(50) NOT NULL,
  state VARCHAR(20) NOT NULL,
  zip VARCHAR(10) NOT NULL,
  reward_points INT DEFAULT 0,
  latitude VARCHAR(50) NOT NULL,
  longitude VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE payment_info (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  card_number INT NOT NULL,
  expiration VARCHAR(5) NOT NULL,
  ccv INT NOT NULL,
  billing_zip VARCHAR(10) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE stores (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  address VARCHAR(100) NOT NULL,
  latitude VARCHAR(50) NOT NULL,
  longitude VARCHAR(50) NOT NULL,
  miles_away VARCHAR(5),
  store_open TIME NOT NULL,
  store_close TIME NOT NULL,
  url VARCHAR(250),
  featured_foods VARCHAR(100),
  featured_drinks VARCHAR(100),
  food_tag BOOLEAN DEFAULT 0,
  tea_tag BOOLEAN DEFAULT 0,
  coffee_tag BOOLEAN DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  store_id INT NOT NULL,
  rating INT NOT NULL,
  body VARCHAR(250) NOT NULL,
  date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (store_id) REFERENCES stores(id)
);

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  store_id INT NOT NULL,
  name VARCHAR(20) NOT NULL,
  price DECIMAL(3,2) NOT NULL,
  category VARCHAR(20) NOT NULL,
  is_featured_item BOOLEAN DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY (store_id) REFERENCES stores(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u <USER> < schema.sql
 *    OR
 *    mysql -u <USER> -p < schema.sql
*/
