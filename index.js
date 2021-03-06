const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
    origins: 'localhost:3010'
});
const compression = require('compression');

const weather = require('./weather');
const db = require('./db');
const cookieSession = require('cookie-session');
const csurf = require('csurf');
const cryptoRandomString = require('crypto-random-string');
const ses = require('./ses');
const { hash, compare } = require('./bc');
app.use(compression());





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



const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 180
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
app.use(express.urlencoded({ extended: false }));
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

const fetch = require("node-fetch");

let secrets = require("./secrets");
//API: secrets.Weather

let weatherUrl;



let arrWeather = [];
let finalWeather = [];

function empty() {
    finalWeather.length = 0
}

let valueWeather;
app.get('/get-weather:id', (req, res) => {
    console.log('req.body.city::::::: ', req.params.id);
    weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${req.params.id}&appid=${secrets.Weather}&units=metric`;
    fetch(weatherUrl).then(apiRes => {
        console.log('res: ', apiRes)
        return apiRes.json()
    }).then(data => {
        //console.log("Data List Loaded", data.list)
        data.list.map(elem => {
            //console.log('temp: ', elem.main.temp)
            //arr.push(elem.rain);
            valueWeather = Math.round(elem.main.temp)
            //console.log('ValueWeather.:', valueWeather);
            arrWeather.push(valueWeather)
        })
        //console.log('arrWeather', arrWeather)
        finalWeather.push(arrWeather[0]);
        finalWeather.push(arrWeather[8]);
        finalWeather.push(arrWeather[16]);
        finalWeather.push(arrWeather[24]);
        console.log('finalWeather: ', finalWeather);

        res.json(finalWeather)
        empty();

    }

    ).catch(err => console.log('error in weather: ', err))
})


///////////////////////////////////////////////////////////////

// app.get('/get-weather:id', (req, res) => {
//     console.log('req.body.city::::::: ', req.params.id);
//     weather.getWeather(req.params.id).then(results => {
//         //console.log('results from weather: ', JSON.parse(results))
//         let test = JSON.parse(results);
//         console.log('::::::::.', test[0].forecast.slice(2));
//         res.json(test[0].forecast.slice(2));

//     }).catch(err => { console.log('error in weather: ', err) })
// })

/////////////////////////////////////////////////////////////////////////


app.post('/organizer', (req, res) => {
    console.log('req.body: ', req.body);
    let email = req.body.email;
    let pass = req.body.password;
    hash(pass).then(hashedPass => {
        db.addOrganizer(email, hashedPass).then(results => {
            req.session.userId = results.rows[0].id;
            req.session.organizer = true;
            console.log('cookie after register addOrganizer: ', req.session.userId);
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
    console.log('EMAIL: ', email)
    db.getPass(email).then(results => {
        console.log('results.rows: ', results.rows[0])
        if (results.rows.length == 0) {
            console.log("did not register");
            location.replace('/home');
        } else {
            if (email === results.rows[0].email) {
                console.log('pass inserted in login: ', pass)
                compare(pass, results.rows[0].password).then(match => {
                    if (match == true) {
                        console.log('pass match', match);
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
                location.replace('/organizer-registration');
                res.json([]);
            }
        }
    }).catch(err => {
        console.log('error passing email', err);
        res.json([]);
    });

})




app.get('/festivals', (req, res) => {
    db.getFestivals().then(results => {
        console.log('results: ', results.rows);
        res.json(results.rows);
    }).catch(err => {
        console.log('err: ', err);
    });
})

app.post('/festival-registration', uploader.single('file'), ses.upload, (req, res) => {
    console.log('req.body festival registration', req.body);
    let name = req.body.name;
    let homepage = req.body.homepage;
    let startingDate = req.body.startingDate;
    let finishingDate = req.body.finishingDate;
    let location = req.body.location;
    let country = req.body.country;
    let price = req.body.price;
    let style = req.body.style;
    let description = req.body.description;
    let filename = req.file.filename;
    let imageUrl = `https://s3.amazonaws.com/spicedling/${filename}`;
    if (req.file) {
        db.addFestival(imageUrl, name, homepage, startingDate, finishingDate, location, country, price, style, description).then(results => {
            req.session.userId = results.rows[0].id;
            console.log('results from addFestivals: ', results.rows);
            res.json(results.rows[0]);
        }).catch(err => {
            console.log('err: ', err);
        });
    } else {
        res.json({ success: false });
    }
})

app.post('/uploadImage', uploader.single('file'), (req, res) => {
    console.log('axios in /upload')
    console.log('::::::::', req.session.userId)
    //console.log('req::', req)
    let userId = req.session.userId;
    let filename = req.file.filename;
    let url = `https://s3.amazonaws.com/spicedling/${filename}`;
    if (req.file) {
        db.addImage(userId, url).then(results => {
            console.log('results from addImages: ', results.rows);
            res.json(results.rows[0]);
        }).catch(err => {
            console.log('err: ', err);
        });
    } else {
        res.json({ success: false });
    }
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
            req.session.user = true;
            console.log('cookie after register addUser: ', req.session.userId);
            //console.log('hashedPass: ', hashedPass);

            console.log('results: ', results.rows[0]);
            res.json(results.rows[0]);
        }).catch(err => console.log('error in registration', err));
    }).catch(err => console.log('error with password', err));
});

app.get(`/selectedFestival/:id`, (req, res) => {
    console.log('selectedFestival');
    db.getSelectedFestival(req.params.id).then(results => {
        console.log('results selected festival: ', results.rows[0]);
        res.json(results.rows);
    }).catch(err => { console.log('err: ', err) });

});


app.post('/addRatings', (req, res) => {
    console.log('axios addRatings')
    //console.log('req.body: ', req.body);
    db.addRatings(req.body.festivalId, req.body.location, req.body.organization, req.body.food, req.body.toilets_showers, req.body.text).then(results => {
        console.log('results addRatings: ', results.rows[0]);
        res.json(results.rows[0]);
    }).catch(err => { console.log('err: ', err) });
})

app.get(`/get-ratings/:id`, (req, res) => {
    console.log('req.params: ', req.params)
    db.getRatings(req.params.id).then(results => {
        //console.log('results fromgetRatings: ', results.rows);
        res.json(results.rows);

    }).catch(err => { console.log('err: ', err) });
})

app.get('/getUser/:id', (req, res) => {
    db.getUser(req.params.id).then(results => {
        console.log('results fromgetUser: ', results.rows);
        res.json(results.rows)
    }).catch(err => { console.log('err: ', err) });
})





app.get('/log-out', (req, res) => {
    //req.session = null;
    //res.end();
    res.redirect('/home');
});


app.get('/', (req, res) => {
    res.redirect('/home');
    // if (!req.session.userId) {
    //     res.redirect('/home');
    // } else {
    //     res.sendFile(__dirname + '/index.html');
    // }
})


app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    // if (!req.session.userId) {
    //     res.redirect('/home');
    // } else {
    //     res.sendFile(__dirname + '/index.html');
    // }
})


// app.get('/home', (req, res) => {
//     if (req.session.userId) {
//         res.redirect('/');
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



server.listen(3010, function () {
    console.log("Server 3010 listening.");
});






///////////////////////////////////////
//
//app.post('/festival-registration', (req, res) => {
//     console.log('req.body uploadimage::: ', req.body)
//     let name = req.body.name;
//     let homepage = req.body.homepage;
//     let startingDate = req.body.startingDate;
//     let finishingDate = req.body.finishingDate;
//     let location = req.body.location;
//     let price = req.body.price;
//     let style = req.body.style;
//     let description = req.body.description;
//     if (req.file) {
//         db.addFestival(name, image, homepage, startingDate, finishingDate, location, price, style, description).then(results => {
//             //req.session.userId = results.rows[0].id;
//             console.log('results from addFestivals: ', results.rows);
//             res.json(results.rows[0]);
//         }).catch(err => {
//             console.log('err: ', err);
//         });


//         //     db.addImage(url).then(results => {
//         //         console.log('results from addImages: ', results.rows);
//         //         res.json(results.rows[0]);
//         //     }).catch(err => {
//         //         console.log('err: ', err);
//         //     });
//         // } else {
//         //     res.json({ success: false });
//     }
// })