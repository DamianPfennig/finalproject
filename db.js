const spicedPg = require("spiced-pg");

let db = spicedPg(
    process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/finalproject"
);

module.exports.addOrganizer = (email, pass) => {
    return db.query(`
        INSERT INTO organizers (email, password)
        VALUES ($1, $2)
        RETURNING *`,
        [email, pass]
    );
};

module.exports.getPass = (email) => {
    return db.query(`
        SELECT *
        FROM organizers
        WHERE email = '${email}'
    `);
};


module.exports.getFestivals = () => {
    return db.query(`
    SELECT id,
    name,
    TO_CHAR (starting_date,'DD.MM') as startingDate,
    TO_CHAR (finishing_date,'DD.MM.YYYY') as finishingDate,
    location,
    price,
    style ,
    image_url as imageUrl ,
    url ,
    description FROM festivals
    `)
}

module.exports.addFestival = (imageUrl, name, homepage, startingDay, finishingDay, location, price, style, description) => {
    return db.query(
        `
        INSERT INTO festivals (image_url, name, url, starting_date,finishing_date, location, price, style, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
        [imageUrl, name, homepage, startingDay, finishingDay, location, price, style, description]
    );
};

module.exports.addImage = (id, url) => {
    return db.query(`
    INSERT INTO images (festival_id, image)
    VALUES ($1, $2)
    RETURNING *`,
        [id, url]
    )
}

module.exports.getSelectedFestival = id => {

    return db.query(`
    SELECT id,
    name,
    TO_CHAR (starting_date,'DD.MM') as startingDate,
    TO_CHAR (finishing_date,'DD.MM.YYYY') as finishingDate,
    location,
    price,
    style ,
    image_url as imageUrl ,
    url ,
    artists,
    description FROM festivals
    WHERE id = '${id}'
    `)

}


module.exports.addUser = (first, last, email, pass) => {
    return db.query(`
        INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [first, last, email, pass]
    );
};


module.exports.getPass = (emailInput) => {
    return db.query(`
        SELECT password, email, id 
        FROM users
        WHERE email = '${emailInput}'
    `);
};

module.exports.addRatings = (festivalId, location, organization, food, toilets_showers, text) => {
    return db.query(`
    INSERT INTO ratings (festival_id, location, organization, food, toilets_showers, text)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
        [festivalId, location, organization, food, toilets_showers, text]
    )
}

module.exports.getRatings = (url) => {
    return db.query(`
    SELECT * 
    FROM ratings
    WHERE festival_id = ${url}
    
    `)
}

module.exports.getUser = url => {
    return db.query(`
    SELECT *
    from users
    WHERE id = ${url}
    `)
}