insert into persons(first_name, last_name, date_of_birth, gender_id, place_of_birth, place_of_living)
values ('cams', 'admin', '1970-01-01',1,'', '');
select * from persons;
insert into users(username, password, person_id, role_name)
values ('cams', '$2a$10$Phs/dmGFZvAhWBDnchSoaeJrVRsAGDCx4jte6FB93czJN7mhVGfny', 1, 'ADMIN');
select * from users
