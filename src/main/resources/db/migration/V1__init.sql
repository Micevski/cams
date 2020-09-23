----init db-----
create table genders(
    id bigserial primary key,
    name text
);

create table seat_positions(
    id bigserial primary key,
    name text,
    seat_num integer
);

create table injured_levels(
    id bigserial primary key,
    name text
);

create table persons (
    id bigserial primary key,
    first_name text,
    last_name text,
    date_of_birth timestamp,
    gender_id int references genders(id),
    place_of_birth text,
    place_of_living text,
    unique_person_identifier text unique
);

create table participants(
    id bigserial primary key,
    type text,
    model text,
    make text,
    production_year integer,
    register_plate text unique,
    owner_id bigint references persons(id)
);

create table participant_passengers(
    id bigserial primary key,
    participant_id bigint references participants(id),
    passenger_person_id bigint references persons(id),
    seat_position_id bigint references seat_positions(id),
    injured_id int references injured_levels(id)
);

create table locations(
    id bigserial primary key,
    lat decimal(9,6),
    lng decimal(9,6),
    street_name text,
    street_number text,
    area text,
    city text,
    country text,
    postcode text
);

create table accidents(
    id bigserial primary key,
    location_id bigint references locations(id),
    date_accident timestamp,
    reason text,
    description text
);

create table accident_participants(
    id bigserial primary key,
    accident_id bigint references accidents(id),
    participant_id bigint references participants(id)
);
