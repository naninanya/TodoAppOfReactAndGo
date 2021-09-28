#!/bin/bash

set -x

psql -U $DB_USER -d $DB_NAME << EOSQL
CREATE TABLE TodoItem (
    id SERIAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (id)
);
EOSQL