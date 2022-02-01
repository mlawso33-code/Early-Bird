/* DUMMY STORE */
INSERT INTO stores (name, street_address, city, state, zip, latitude, longitude, store_open, store_close, url)
VALUES ('Coffee Test Shop', '555 Test Me Dr.', 'TestCity', 'TS', '12345', '5LAT','1LONG', '08:00:00', '19:00:00', 'google.com');


/* DUMMY REVIEWS */
INSERT INTO reviews (user_id, store_id, rating, body, date)
VALUES (1, 1, 5, 'Weirdest coffeee ever, was all in code?', '2022-01-31');