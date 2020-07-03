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
        SELECT id, first, last, image, bio
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

module.exports.addBio = (id, bio) => {
    return db.query(`
    UPDATE users
    SET bio = $1
    WHERE id = '${id}'
    RETURNING bio`,
        [bio]
    )
}

module.exports.getBio = (id) => {
    return db.query(`
    SELECT bio 
    FROM users
    WHERE id = '${id}'
    `)
}

module.exports.getOtherUser = (id) => {
    return db.query(`
    SELECT *
    FROM users
    WHERE id = '${id}'
    `,)
}

module.exports.getUsers = () => {
    return db.query(`
    SELECT * FROM users ORDER BY id DESC LIMIT 3;
    `)
}

module.exports.getFindUsers = id => {
    return db.query(`
    SELECT * FROM users
    WHERE first ILIKE  $1`,
        [id + '%']
    );
}

// module.exports.getFriendship = id => {
//     return db.query(`
//     SELECT * FROM friendships
//     WHERE receiver_id = '${id}'
//     `)
// }

module.exports.getFriendship = (sender_id, receiver_id) => {
    return db.query(`
    SELECT * FROM friendships
  WHERE (receiver_id = $1 AND sender_id = $2)
  OR (receiver_id = $2 AND sender_id = $1)`,
        [sender_id, receiver_id])
}

module.exports.addFriendship = (sender_id, receiver_id) => {
    return db.query(`
    INSERT INTO friendships (sender_id, receiver_id)
    VALUES ($1, $2)`,
        [sender_id, receiver_id])
}

module.exports.acceptFriendship = (sender_id, receiver_id) => {
    return db.query(`
    UPDATE friendships
    SET accepted = true
    WHERE sender_id = $2 AND receiver_id = $1`,
        [sender_id, receiver_id])
}

module.exports.deleteFriendship = (sender_id, receiver_id) => {
    return db.query(`
    DELETE FROM friendships
    WHERE (receiver_id = $2 AND sender_id = $1)
    OR (receiver_id = $1 AND sender_id = $2)`,
        [sender_id, receiver_id])

}

module.exports.getFriendsAndRequests = (id) => {
    return db.query(`
    SELECT users.id, users.first, users.last, users.image, friendships.accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
    OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
    OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)`,
        [id])
}


// module.exports.addBio = (id, bio) => {
//     return db.query(`
//     INSERT INTO users (bio)
//     VALUES ($1)
//     WHERE id = '${id}'
//     RETURNING *`,
//         [bio]
//     )
// }

