const express = require('express');
const app = express();
const compression = require('compression');
const db = require('./db');
const cookieSession = require('cookie-session');
const csurf = require('csurf');
const cryptoRandomString = require('crypto-random-string');
const ses = require('./ses');

//////////////----for uploading image----///////////////

const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

//////////////////////////////////////////////////////////////////


const { hash, compare } = require('./bc');

app.use(compression());

app.use(cookieSession({
    secret: "I'm always angry",
    maxAge: 1000 * 60 * 60 * 24 * 14
}));


app.use(csurf());

app.use(function (req, res, next) {
    //req.csrfToken generate token
    res.cookie('mytoken', req.csrfToken())
    //console.log('req.csrfToken', req.csrfToken())
    next();
})



app.use(express.json());

app.use(express.static('public'));


if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}


app.post('/register', (req, res) => {
    console.log('req.body: ', req.body);
    //create a database 
    let first = req.body.first;
    let last = req.body.last;
    let email = req.body.email;
    let pass = req.body.password;
    //console.log('req.session.userId :', req.session.userId)
    //res.json({ success: true });
    hash(pass).then(hashedPass => {
        db.addUser(first, last, email, hashedPass).then(results => {
            req.session.userId = results.rows[0].id;
            console.log('cookie after register addUser: ', req.session.userId);
            //console.log('hashedPass: ', hashedPass);
            results.rows[0].success = true;
            console.log('results: ', results.rows[0]);
            res.json(results.rows[0]);
        }).catch(err => console.log('error in registration', err));
    }).catch(err => console.log('error with password', err));
});

app.post('/login', (req, res) => {
    console.log('req.body in login ', req.body)
    let email = req.body.email;
    let pass = req.body.password;
    db.getPass(email).then(results => {
        console.log('results.rows: ', results.rows[0])
        if (results.rows == []) {
            console.log("did not register");
            location.replace('/');
        } else {
            if (email === results.rows[0].email) {
                console.log('pass inserted in login: ', pass)
                compare(pass, results.rows[0].password).then(match => {
                    if (match == true) {
                        console.log('pass match', match);
                        //let idInUser = results.rows[0].id;
                        //console.log('user id after login: ', idInUser);
                        results.rows[0].success = true;
                        req.session.userId = results.rows[0].id;
                        res.json(results.rows[0]);

                    } else {
                        console.log('pass did not match', match);
                        results.rows[0].success = false;
                        res.json(results.rows[0]);

                    }
                }).catch(err => {
                    console.log('error comparing password', err);
                    results.rows[0].success = false;
                    res.json(results.rows[0]);

                });

            } else {
                console.log('email not found')
                location.replace('/');
                res.json([]);
            }
        }

    }).catch(err => {
        console.log('error passing email', err);
        res.json([]);
    });

})

app.post('/reset/start', (req, res) => {
    console.log('req.body in login ', req.body)
    let email = req.body.email;
    db.getPass(email).then(results => {
        console.log('results from get email in /reset: ', results.rows[0])
        if (results.rows == []) {
            console.log("in /reset--> email not found");
            results.rows[0].success = false;
        } else {
            if (email === results.rows[0].email) {
                const secretCode = cryptoRandomString({
                    length: 6
                });
                db.addCode(email, secretCode).then(results => {
                    console.log('results from secretCode: ', results.rows[0])
                    console.log('email', email)
                    console.log('secretCode: ', secretCode)
                    const message = `Your code: ${secretCode}`
                    const subject = `Change your password`
                    ses.sendEmail(email, message, subject).then(results => {
                        console.log('email sent');
                        res.json();

                    }).catch(err => {
                        console.log('error sending email:', err);
                    });
                    console.log('results from addCode: ')
                    results.rows[0].success = true;

                    res.json(results.rows[0]);


                }).catch(err => console.log('error inserting secretCode', err));

            }
        }

    }).catch(err => {
        console.log('error getting email', err)
        res.json([])
    });
})

app.post('/reset/verify', (req, res) => {
    console.log('req.body in /reset/verify ', req.body)
    let email = req.body.email;
    db.getCode(email).then(results => {
        console.log('results from getCode: ', results.rows[0])
        if (req.body.code === results.rows[0].code) {
            let pass = req.body.password;
            hash(pass).then(hashedPass => {
                db.updatePass(email, hashedPass).then(results => {
                    console.log('results verify hashed pass: ', results.rows[0]);
                    results.rows[0].success = true;
                    res.json(results.rows[0]);
                }).catch(err => console.log('error in registration', err));
            }).catch(err => console.log('error with password', err));
        } else {
            results.rows[0].success = false;
            res.json(results.rows[0]);
        }
    }).catch(err => {
        console.log('error getting code', err);
    });
})

app.get('/user', (req, res) => {
    //console.log('req.session.userId:: ', req.session.userId)
    let userId = req.session.userId;
    db.getUserInfo(userId).then(results => {
        //console.log('results from getUserInfo: ', results.rows[0]);
        res.json(results.rows[0]);
    }).catch(err => console.log('error inserting secretCode', err));
})

app.post('/upload', uploader.single('file'), ses.upload, (req, res) => {
    console.log('axios in /upload')
    //console.log('req::', req)
    let userId = req.session.userId;
    let filename = req.file.filename;
    let url = `https://s3.amazonaws.com/spicedling/${filename}`;
    if (req.file) {
        db.addImage(userId, url).then(results => {
            //console.log('results from addImages: ', results.rows[0])
            res.json(results.rows[0]);
        }).catch(err => {
            console.log('err: ', err);
        });
    } else {
        res.json({ success: false });
    }
})

app.post('/bioediting', (req, res) => {
    //console.log('req.body in bioediting::', req.body);
    let text = req.body.biotext;
    let userId = req.session.userId;
    //console.log('in bioediting::', text, userId)
    db.addBio(userId, text).then(results => {
        console.log('results from addBio: ', results.rows[0]);
        res.json(results.rows[0]);
    }).catch(err => console.log('error in bioediting', err));


})

// app.get('/isBio', (req, res) => {
//     ('axios getting bio')
// })

app.get('/otherUser/:id', async function (req, res) {
    console.log('req otherUser in index:', req.params.id)
    const otherUser = await db.getOtherUser(req.params.id);
    res.json(otherUser);
})


app.get('/welcome', (req, res) => {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
})

//final route in order...catch everything else
app.get('*', function (req, res) {
    if (!req.session.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.listen(3000, function () {
    console.log("I'm listening.");
});


// app.post('/upload', uploader.single('file'), ses.upload, (req, res) => {
//     console.log('all worked well');
//     //console.log('file:', req.file);
//     console.log('req.body', req.body);
//     let filename = req.file.filename;
//     let url = `https://s3.amazonaws.com/spicedling/${filename}`;
//     console.log('title:::', title);
//     if (req.file) {
//         db.addImages(url).then(results => {
//             //console.log('results from addImages: ', results.rows[0])
//             res.json(results.rows[0]);
//         }).catch(err => {
//             console.log('err: ', err);
//         });
//     } else {
//         res.json({ success: false });
//     }
// })