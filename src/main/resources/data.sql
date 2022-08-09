insert into user (id, name, email, password, gender, role, location) values (1, 'Thomas Luu', 'thomas_test123@yopmail.com', '123', 'MALE', 'ADMIN', '');
insert into user (id, name, email, password, gender, role, location) values (2, 'John Doe', 'john_test123@yopmail.com', '123', 'MALE', 'CUSTOMER', '');
insert into user (id, name, email, password, gender, role, location) values (3, 'Alice George', 'alice_test123@yopmail.com', '123', 'FEMALE', 'CUSTOMER', '');

-- incompatible with mysql8
-- SELECT setval(student_sequence, 1000);  -- next value will be 1001
