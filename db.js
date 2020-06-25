const spicedPg = require('spiced-pg');

let db = spicedPg(
    process.env.DATABASE_URL ||
    'postgres:postgres:postgres@localhost:5432/socialnetwork'
);

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

module.exports.addCode = (email, code) => {
    return db.query(`
        INSERT INTO reset_codes (email, code)
        VALUES($1, $2)
        RETURNING *`,
        [email, code])
}

module.exports.getCode = (email, code) => {
    return db.query(`
        SELECT code 
        FROM reset_codes
        WHERE email = '${email}'
        AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
        ORDER BY created_at DESC
        LIMIT 1
    `)
}

module.exports.updatePass = (email, password) => {
    return db.query(`
        UPDATE users
        SET password = $1
        WHERE email = '${email}'
        RETURNING *`,
        [password]
    );
}

module.exports.getUserInfo = (userId) => {
    return db.query(`
        SELECT id, first, last, image
        FROM users
        WHERE id = '${userId}'
    `)
}

module.exports.addImage = (id, url) => {
    return db.query(`
    UPDATE users
    SET image = $1
    WHERE id = '${id}'
    RETURNING *`,
        [url]
    )
}