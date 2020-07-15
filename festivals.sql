DROP TABLE IF EXISTS festivals;

CREATE TABLE festivals
(
    id SERIAL primary key,
    name VARCHAR,
    starting_date DATE,
    finishing_date DATE,
    location VARCHAR,
    country VARCHAR,
    price INT,
    image_url VARCHAR,
    url VARCHAR,
    style VARCHAR,
    artists VARCHAR,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO festivals
    (name, starting_date, finishing_date, location, country, price, style, image_url, url, artists, description)
VALUES
    (
        'Fusion Festival',
        '2021-06-30',
        '2021-07-04',
        'Mirow',
        'Germany',
        '145',
        'Different music styles, theater, workshops and more',
        'https://s3.amazonaws.com/spicedling/-x5LA_zPzx1w233T6Oe7zoLj-zaDTqbm.jpg',
        'https://www.fusion-festival.de/de/x/home',
        'Rudimental, Dizzee, Rascal, John Newman, Jonas Blue, Sigala, Nina Nesbitt, Anton Powers',
        'Far from everyday life we celebrate 4 days of parallel society of a special kind, looking for a possibly better world. We know that there is no real place where all of this comes true. Nevertheless, or exactly because of that, it is important that FUSIONists from all corners of the continent meet in this very place.'
    );


INSERT INTO festivals
    (name, starting_date, finishing_date, location, country, price, style, image_url, url, artists, description)
VALUES
    (
        'Nation of Gondwana',
        '2021-07-23',
        '2021-07-25',
        'Berlin',
        'Germany',
        '120',
        'Electro',
        'https://s3.amazonaws.com/spicedling/raDYuCJw7dr_9dbuQ-z0qs6OtT6s-MiD.jpg',
        'https://www.pyonen.de',
        'Kim Ann Foxman, Stimming, Radio Slave, Move D, Rampue, Grizzly, David Dorad, Joel Mull, Der Dritte Raum, Anetha, Heimlich Knüller, Sven Dohse, Elliver, Maurizio',
        'Die subversiv-Agrarier Pyonen laden zur Selbst­enthemmung auf die Wiese! Geräuschsymphoniker unterstützt durch Lichtdepeschen dirigieren das Driftvergnügen der Schallwellenreiter. Körperliteraten in Soundsäulen sind unterwegs zum Hyperraumsprung.'
    );


INSERT INTO festivals
    (name, starting_date, finishing_date, location, country, price, style, image_url, url, artists, description)
VALUES
    (
        'Summerjam',
        '2021-07-02',
        '2021-07-04',
        'Köln',
        'Germany',
        '90',
        'Reggae',
        'https://s3.amazonaws.com/spicedling/wfDv6O6nB3aCUgOy9Mxd3CK5HlB6_bLC.jpg',
        'https://summerjam.de/',
        'Gentleman, Fettes Brot, JAH9, JUJU, Patrice',
        'Summerjam is a European reggae festival. It takes places annually in July at the Fühlinger See, which is a lake located in Cologne, Germany. The event usually attracts an audience of between 25,000 and 30,000 people. Two stages and two tents are located on an island, with the camping area surrounding the lake.'
    );


INSERT INTO festivals
    (name, starting_date, finishing_date, location, country, price, style, image_url, url, artists, description)
VALUES
    (
        'Primavera Sound',
        '2021-06-21',
        '2021-06-25',
        'Barcelona',
        'Spain',
        '150',
        'Rock, Pop, Alternative, Native',
        'https://s3.amazonaws.com/spicedling/nKCL0_zhAxXdW3XlWwm4obqBde6jvXQO.jpg',
        'https://www.primaverasound.com/en',
        'Massive Attack, Carla, Akasha Kid, Le Nais',
        'The nature of the festival (urban and an integrated part of the city) and the wide range of bands represented have made Primavera Sound a meeting point for artists and spectators from all generations. In 2012 the festival expanded to Porto, the second biggest city in Portugal under the name NOS Primavera Sound.[1] This one takes place at the Parque da Cidade a week after the Barcelona edition. In September 2021, the festival will celebrate its first edition in Los Angeles called Primavera Sound Los Angeles.'
    )


