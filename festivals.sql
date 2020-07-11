DROP TABLE IF EXISTS festivals;

CREATE TABLE festivals
(
    id SERIAL primary key,
    name VARCHAR NOT NULL CHECK (name != ''),
    starting_date DATE NOT NULL,
    finishing_date DATE NOT NULL,
    location VARCHAR NOT NULL CHECK (location != ''),
    price INT NOT NULL,
    style VARCHAR NOT NULL,
    image_url VARCHAR,
    url VARCHAR,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO festivals
    (name, starting_date, finishing_date, location, price, style, image_url, url, description)
VALUES
    (
        'Fusion Festival',
        '2021-06-30',
        '2021-07-04',
        'Lärz, Germany',
        '145',
        'Different music styles, theater, workshops and more',
        'public/fusion-rakete-farbe.jpg',
        'https://www.fusion-festival.de/de/x/home',
        'Far from everyday life we celebrate 4 days of parallel society of a special kind, looking for a possibly better world. We know that there is no real place where all of this comes true. Nevertheless, or exactly because of that, it is important that FUSIONists from all corners of the continent meet in this very place.'
)

