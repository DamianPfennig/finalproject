const spicedPg = require("spiced-pg");

let db = spicedPg(
    process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

module.exports.addUser = (first, last, email, pass) => {
    return db.query(
        `
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



