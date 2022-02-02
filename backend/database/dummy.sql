/* DUMMY STOREs */
INSERT INTO stores (name, address, latitude, longitude, miles_away, store_open, store_close, url, featured_foods, featured_drinks, food_tag, tea_tag, coffee_tag)

VALUES
('Coffee Shop 1', '111 Test Me Dr., TestCity, TS, 12345', '10.123','-115.234', '1.1', '08:00:00', '19:00:00', 'http://www.shop1.com', '["tacos1", "biscuit1"]', '["coffee1", "fruit juice1"]', 0, 1, 1),
('Coffee Shop 2', '222 Test Me Dr., TestCity, TS, 12345', '20.123','-125.234', '1.2', '08:00:00', '19:00:00', 'http://www.shop2.com', '["tacos2", "biscuit2"]', '["coffee2", "fruit juice2"]', 1, 1, 1),
('Coffee Shop 3', '333 Test Me Dr., TestCity, TS, 12345', '30.123','-135.234', '1.3', '08:00:00', '19:00:00', 'http://www.shop3.com', '["tacos3", "biscuit3"]', '["coffee3", "fruit juice3"]', 1, 0, 1),
('Coffee Shop 4', '444 Test Me Dr., TestCity, TS, 12345', '40.123','-145.234', '1.4', '08:00:00', '19:00:00', 'http://www.shop4.com', '["tacos4", "biscuit4"]', '["coffee4", "fruit juice4"]', 0, 1, 1),
('Coffee Shop 5', '555 Test Me Dr., TestCity, TS, 12345', '50.123','-155.234', '1.5', '08:00:00', '19:00:00', 'http://www.shop5.com', '["tacos5", "biscuit5"]', '["coffee5", "fruit juice5"]', 1, 1, 1);


/*dummy user */
INSERT INTO users (username, password, email, street_address, city, state, zip, reward_points, latitude, longitude)
VALUES
('testMan111', '1234', 'testuser1@test.com', '111 Test Street', 'TestCity', 'TS', '12345', 0, '11.123', '116.234'),
('testMan222', '1234', 'testuser@test.com', '123 Test Street', 'TestCity', 'TS', 12345, 0, '21.123', '126.234'),
('testMan333', '1234', 'testuser@test.com', '123 Test Street', 'TestCity', 'TS', 12345, 0, '31.123', '136.234'),
('testMan444', '1234', 'testuser@test.com', '123 Test Street', 'TestCity', 'TS', 12345, 0, '41.123', '146.234'),
('testMan555', '1234', 'testuser@test.com', '123 Test Street', 'TestCity', 'TS', 12345, 0, '51.123', '156.234');


/* DUMMY REVIEWS */
INSERT INTO reviews (user_id, store_id, rating, body, date)
VALUES
(1, 1, 5, 'Weirdest coffeee ever 1, was all in code?', '2022-01-31'),
(2, 2, 5, 'Weirdest coffeee ever 2, was all in code?', '2022-01-31'),
(3, 3, 5, 'Weirdest coffeee ever 3, was all in code?', '2022-01-31'),
(4, 4, 5, 'Weirdest coffeee ever 4, was all in code?', '2022-01-31'),
(5, 5, 5, 'Weirdest coffeee ever 5, was all in code?', '2022-01-31');