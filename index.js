const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    origins: 'localhost:8080'
});
const compression = require('compression');
const db = require('./db');
const cookieSession = require('cookie-session');
const csurf = require('csurf');
const cryptoRandomString = require('crypto-random-string');
const ses = require('./ses');
const { hash, compare } = require('./bc');
app.use(compression());

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

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

////////////////////////////////////////////////////////////////

app.get('/festivals', (req, res) => {
    db.getFestivals().then(results => {
        console.log('results: ', results.rows);
        res.json(results.rows);
    }).catch(err => {
        console.log('err: ', err);
    });
})

app.post('/festival-registration', (req, res) => {
    console.log('req.body', req.body);
    let name = req.body.name;
    let homepage = req.body.homepage;
    let startingDate = req.body.startingDate;
    let finishingDate = req.body.finishingDate;
    let location = req.body.location;
    let price = req.body.price;
    let style = req.body.style;
    let description = req.body.description;
    db.addFestival(name, homepage, startingDate, finishingDate, location, price, style, description).then(results => {
        req.session.userId = results.rows[0].id;
        console.log('results from addFestivals: ', results.rows);
        res.json(results.rows[0]);
    }).catch(err => {
        console.log('err: ', err);
    });
})

app.post('/attendees-registration', (req, res) => {
    console.log('req.body', req.body);
    let first = req.body.first;
    let last = req.body.last;
    let email = req.body.email;
    let pass = req.body.password;
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

app.get(`/selectedFestival/:id`, async function (req, res) {
    const results = await db.getSelectedFestival(req.params.id)
    console.log('results: ', results.rows[0]);
    res.json(results.rows);
})




app.get('/log-out', (req, res) => {
    req.session = null;
    //res.end();
    res.redirect('/welcome');
})



// app.get('/home', (req, res) => {
//     if (req.session.userId) {
//         res.redirect('/home');
//     } else {
//         res.sendFile(__dirname + '/index.html');
//     }
// })


app.get('*', function (req, res) {
    if (!req.session.userId) {
        res.redirect('/home');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});



server.listen(8080, function () {
    console.log("I'm listening.");
});

