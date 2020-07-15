DROP TABLE IF EXISTS images;

CREATE TABLE images
(
    id SERIAL PRIMARY KEY,
    image VARCHAR NOT NULL,
    festival_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- REFERENCES festivals
-- (id) NOT NULL