/*DUMMY USERS */
INSERT INTO users (username, password, email, street_address, city, state, zip, reward_points, latitude, longitude)
VALUES
('testMan111', '1234', 'testuser1@test.com', '111 Test Street', 'TestCity', 'TS', '12345', 0, '11.123', '116.234'),
('testMan222', '1234', 'testuser@test.com', '123 Test Street', 'TestCity', 'TS', '12345', 0, '21.123', '126.234'),
('testMan333', '1234', 'testuser@test.com', '123 Test Street', 'TestCity', 'TS', '12345', 0, '31.123', '136.234'),
('testMan444', '1234', 'testuser@test.com', '123 Test Street', 'TestCity', 'TS', '12345', 0, '41.123', '146.234'),
('testMan555', '1234', 'testuser@test.com', '123 Test Street', 'TestCity', 'TS', '12345', 0, '51.123', '156.234');


/* DUMMY PRODUCTS */
INSERT INTO products (name, price, category, menu_categories)
VALUES
('Black Coffee', '2.50', 'coffee', '11 14 17'),
('Cold-brew', '3.50', 'coffee', '11 14 17'),
('Java', '1.50', 'coffee', '11 14 17'),
('Half-caf Coffee', '2.25', 'coffee', '12 15 18'),
('Decaf Coffee', '2.50', 'coffee', '12 15 18'),
('Iced Coffee', '2.10', 'coffee', '12 15 18'),
('Espresso', '4.50', 'coffee', '13 16 19'),
('Mocha Frappe', '4.25', 'coffee', '13 16 19'),
('House Coffee', '2.00', 'coffee', '13 16 19'),
('Extra Strong Coffee', '3.50', 'coffee', '13 16 19'),
('Mint Tea', '3.50', 'tea', '11 14'),
('Black Tea', '3.75', 'tea', '11 14'),
('White Tea', '4.50', 'tea', '11 14'),
('Green Tea', '2.25', 'tea', '12 15'),
('Oolong Tea', '3.50', 'tea', '12 15'),
('Yellow Tea', '3.50', 'tea', '12 15'),
('Sweet Tea', '1.50', 'tea', '13 16'),
('Unsweetened Tea', '1.50', 'tea', '13 16'),
('Earl Grey', '3.00', 'tea', '13 16'),
('Orange Tea', '5.00', 'tea', '13 16'),
('Glazed Donut', '2.00', 'food', '11 17'),
('Sprinkled Donut', '2.25', 'food', '11 17'),
('Taco', '3.00', 'food', '11 17'),
('Biscuit', '3.50', 'food', '12 18'),
('Cinnamon Roll', '5.50', 'food', '12 18'),
('BLT Sandwich', '5.00', 'food', '12 18'),
('PB&J Sandwich ', '1.75', 'food', '13 19'),
('Breakfast Burrito', '3.00', 'food', '13 19'),
('Jelly Donut', '3.50', 'food', '13 19'),
('Chocolate Bar', '4.25', 'food', '13 19');


/* DUMMY STORES */
INSERT INTO stores (name, address, latitude, longitude, miles_away, store_open, store_close, url, featured_foods, featured_drinks, food_tag, tea_tag, coffee_tag, menu_id) VALUES
('Coffee Shop 1', '111 Test Me Dr., TestCity, TS, 12345', '10.123','-115.234', '1.1', '08:00:00', '19:00:00', 'http://www.shop1.com', '["tacos1", "biscuit1"]', '["coffee1", "fruit juice1"]', 0, 1, 1, 11),
('Coffee Shop 2', '222 Test Me Dr., TestCity, TS, 12345', '20.123','-125.234', '1.2', '08:00:00', '19:00:00', 'http://www.shop2.com', '["tacos2", "biscuit2"]', '["coffee2", "fruit juice2"]', 1, 1, 1, 13),
('Coffee Shop 3', '333 Test Me Dr., TestCity, TS, 12345', '30.123','-135.234', '1.3', '08:00:00', '19:00:00', 'http://www.shop3.com', '["tacos3", "biscuit3"]', '["coffee3", "fruit juice3"]', 1, 0, 1, 15),
('Coffee Shop 4', '444 Test Me Dr., TestCity, TS, 12345', '40.123','-145.234', '1.4', '08:00:00', '19:00:00', 'http://www.shop4.com', '["tacos4", "biscuit4"]', '["coffee4", "fruit juice4"]', 0, 1, 1, 17),
('Coffee Shop 5', '555 Test Me Dr., TestCity, TS, 12345', '50.123','-155.234', '1.5', '08:00:00', '19:00:00', 'http://www.shop5.com', '["tacos5", "biscuit5"]', '["coffee5", "fruit juice5"]', 1, 1, 1, 19);


/* DUMMY REVIEWS */
INSERT INTO reviews (user_id, store_id, rating, body)
VALUES
(1, 1, 5, 'Weirdest coffeee ever 1, was all in code?'),
(2, 2, 5, 'Weirdest coffeee ever 2, was all in code?'),
(3, 3, 5, 'Weirdest coffeee ever 3, was all in code?'),
(4, 4, 5, 'Weirdest coffeee ever 4, was all in code?'),
(5, 5, 5, 'Weirdest coffeee ever 5, was all in code?'),
(1, 5, 4, 'Best coffeee ever 1!'),
(2, 4, 4, 'Best coffeee ever 2!'),
(3, 2, 4, 'Best coffeee ever 3!'),
(4, 3, 4, 'Best coffeee ever 4!'),
(5, 1, 4, 'Best coffeee ever 5!');


