DROP TABLE IF EXISTS organizers;

CREATE TABLE organizers
(
    id SERIAL primary key,
    email VARCHAR (255) NOT NULL UNIQUE,
    password VARCHAR (255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);