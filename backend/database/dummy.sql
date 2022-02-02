/* DUMMY STORE */
INSERT INTO stores (name, street_address, city, state, zip, latitude, longitude, store_open, store_close, url)
VALUES ('Coffee Test Shop', '555 Test Me Dr.', 'TestCity', 'TS', '12345', '5LAT','1LONG', '08:00:00', '19:00:00', 'google.com');


/* DUMMY REVIEWS */
INSERT INTO reviews (user_id, store_id, rating, body, date)
VALUES (1, 1, 5, 'Weirdest coffeee ever, was all in code?', '2022-01-31');

INSERT INTO reviews (user_id, store_id, rating, body, date)
VALUES (1, 1, 2.5, 'Honestly I wanted more kick out of my coffee even with quadra-expressio', '2022-02-01');

/*dummy user */
INSERT INTO users (username, password, email, street_address, city, state, zip, reward_points, latitude, longitude)
VALUES ('testMan123', '1234', 'testuser@test.com', '123 Test Street', 'TestCity', 'TS', 12345, 5, '5lat', '5long');

INSERT INTO users (username, password, email, street_address, city, state, zip, reward_points, latitude, longitude)
VALUES ('testGirl123', '1234', 'testuser14@test.com', '123 Test Street', 'TestCity', 'TS', 12345, 5, '5lat', '5long');