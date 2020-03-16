create table users (
    id bigserial primary key,
    username text not null,
    password text,
    person_id bigint references persons(id),
    role_name text not null
);
