DROP TABLE IF EXISTS images;

CREATE TABLE images
(
    id SERIAL PRIMARY KEY,
    image VARCHAR NOT NULL,
    festival_id INT REFERENCES festivals (id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO images (image)

-- 'https://s3.amazonaws.com/spicedling/-x5LA_zPzx1w233T6Oe7zoLj-zaDTqbm.jpg',

-- 'https://s3.amazonaws.com/spicedling/raDYuCJw7dr_9dbuQ-z0qs6OtT6s-MiD.jpg',

-- 'https://s3.amazonaws.com/spicedling/wfDv6O6nB3aCUgOy9Mxd3CK5HlB6_bLC.jpg',

-- 'https://s3.amazonaws.com/spicedling/nKCL0_zhAxXdW3XlWwm4obqBde6jvXQO.jpg',


