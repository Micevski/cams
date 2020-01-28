#!/usr/bin/env bash

server=127.0.0.1
if [ "$#" -gt 0 ]; then
  server=$1
fi
db=cams
if [ "$#" -gt 1 ]; then
  db=$2
fi

db_user=cams
export PGPASSWORD="cams"

psql -h $server -U $db_user template1 -c "SET client_min_messages TO WARNING;"
psql -h $server -U $db_user template1 -c "UPDATE pg_database SET datallowconn = 'false' WHERE datname = '$db'"
psql -h $server -U $db_user template1 -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '$db' AND pid <> pg_backend_pid();"
psql -h $server -U $db_user template1 -c "drop database if exists $db;"
psql -h $server -U $db_user template1 -c "create database $db with owner $db_user;"

psql -h $server -U $db_user template1 -c "UPDATE pg_database SET datallowconn = 'true' WHERE datname = '$db';"
