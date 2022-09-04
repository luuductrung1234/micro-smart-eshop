insert into user (id, name, email, password, gender, role, location, environment, devices) values (1, 'Thomas Luu', 'thomas_test123@yopmail.com', '123', 'MALE', 'ADMIN', '', '', '');
insert into user (id, name, email, password, gender, role, location, environment, devices) values (2, 'John Doe', 'john_test123@yopmail.com', '123', 'MALE', 'CUSTOMER', '5,l,6,l,5,r,5,l,5', 'light:0;temperature:0;sound:0', 'light:false');
insert into user (id, name, email, password, gender, role, location, environment, devices) values (3, 'Alice George', 'alice_test123@yopmail.com', '123', 'FEMALE', 'CUSTOMER', '5,l,6,r,5,l,5,r,5', 'light:0;temperature:0;sound:0', 'light:false');

insert into product (id, name, price, category, picture) values (1, 'Dreo Nomad One Tower Fan', '59.99', 'temperature', 'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/715zvhq1-kL._AC_SY879_.jpg');
insert into product (id, name, price, category, picture) values (2, 'BOSCH 9 Gallon Dust Extractor', '549.00', 'dust', 'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/917tgE8N6jL._AC_SY450_.jpg');
insert into product (id, name, price, category, picture) values (3, 'Yogasleep Classic | Noise Cancelling', '47.99', 'sound', 'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/51ulZLjAMWL._AC_SX522_.jpg');
insert into product (id, name, price, category, picture) values (4, 'Sony TV', '368', 'relax', 'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/71GUJVSDv3L._AC_SX425_.jpg');
insert into product (id, name, price, category, picture) values (5, 'Leather Sofa', '78.5', 'relax', 'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/71-4trnLXSL._AC_SX425_.jpg');
insert into product (id, name, price, category, picture) values (6, 'Light Bulb | 10.5 Watt', '11.65', 'light', 'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/81HygR8g0eL._AC_SY450_.jpg');
insert into product (id, name, price, category, picture) values (7, 'Dreo Air Purifiers Macro Pro', '139.99', 'air', 'https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/81mM3EGUzIL._AC_SY550_.jpg');

-- incompatible with mysql8
-- SELECT setval(student_sequence, 1000);  -- next value will be 1001
