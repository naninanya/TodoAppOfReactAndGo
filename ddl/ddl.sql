CREATE TABLE TodoItem (
    id SERIAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY (id)
);

--insert sql
-- insert into TodoItem(name,created_at,updated_at) values('test',current_timestamp,current_timestamp);