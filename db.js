const spicedPg = require("spiced-pg");

let db = spicedPg(
    process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/finalproject"
);

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

module.exports.addFestival = (name, homepage, startingDay, finishingDay, location, price, style, description) => {
    return db.query(
        `
        INSERT INTO festivals (name, url, starting_date,finishing_date, location, price, style, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
        [name, homepage, startingDay, finishingDay, location, price, style, description]
    );
};

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



