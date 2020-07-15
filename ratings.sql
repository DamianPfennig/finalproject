DROP TABLE IF EXISTS ratings;

CREATE TABLE ratings
(
    id SERIAL primary key,
    festival_id INT REFERENCES festivals(id) NOT NULL,
    location INT,
    organization INT,
    food INT,
    toilets_showers INT,
    text VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

