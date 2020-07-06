DROP TABLE IF EXISTS chat;

CREATE TABLE chat
(
    id SERIAL PRIMARY KEY,
    message VARCHAR NOT NULL CHECK (message != ''),
    user_id INT REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO chat
    (message, user_id)
VALUES
    ('I am the first!!!', 150);

INSERT INTO chat
    (message, user_id)
VALUES
    (
        'Hello everybody!!!!',
        151
    );

INSERT INTO chat
    (message, user_id)
VALUES
    (
        'Anybody has any idea of what I could write?',
        152
    );

INSERT INTO chat
    (message, user_id)
VALUES
    (
        'Hey, just write whatever comes to your mind',
        153
    );
