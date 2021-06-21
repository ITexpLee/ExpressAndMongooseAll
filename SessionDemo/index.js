const express = require('express');
const app = express();

//requiring session
const session = require('express-session');

//setting the middleware and adding options to be passed
const sessionOptions = { secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false};
app.use(session(sessionOptions));

//No. of times the page has been viewed
app.get('/viewcount', (req, res) => {
    if(req.session.count) {
        req.session.count += 1;
        console.log('sorry');
    }else{
        req.session.count = 1;
    }
    res.send(`You have viewed this page ${req.session.count} times`);
});

//register name
app.get('/register', (req, res) => {
    const {username = 'Anonymous'} = req.query;
    //setting up .username property in session
    req.session.username = username;
    //redirect to greet page
    res.redirect('/greet');
});

//send greet message with incoming username
app.get('/greet', (req, res) => {
    const {username} = req.session;
    res.send(`welcome back ${username}`);
});


app.listen(3000, () => {
    console.log("Listening on port 3000");
})