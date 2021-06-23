const {
    urlencoded
} = require('express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
//Adding bcrypt 
const bcrypt = require('bcrypt');
//Adding session for session cookie and functionality after loggin in
const session = require('express-session');

mongoose.connect('mongodb://localhost:27017/authDemo', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


//requiring model
const User = require('./models/user.js');

//setting up view engine and path
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares 
app.use(session({
    secret: 'notagoodsecret',
    resave: false,
    saveUninitialized: false
})); //session middleware
app.use(express.urlencoded({
    extended: true
}));

//user created middleware (protect routes)
const requireLogin = (req, res, next) => {
    if(!req.session.user_id) {
        return res.redirect('/login');
    }
    next();
}


app.get('/', (req, res) => {
    res.send('This is the home page')
});

//form index/ user create route
app.get('/register', (req, res) => {
    res.render('register.ejs');
});

//form end route(Create)
app.post('/register', async (req, res) => {
    const {
        username,
        password
    } = req.body.form;
    //here the two parameter are string password and number of rounds
    const hash = await bcrypt.hash(password, 12);
    //Creating new user and saving in database
    const user = new User({
        username: username,
        password: hash
    });
    await user.save();
    //successfully registered you are logged in
    req.session.user_id = user._id; 
    res.redirect('/');
});

//login route (Create route)
app.get('/login', async (req, res) => {
    res.render('login.ejs');
});

app.post('/login', async (req, res) => {
    //fetch username and password from req body
   const {username, password} = req.body.form;
   //identify the user by his username
   const user = await User.findOne({username: username});
    //bcrypt the password and check for match from fetched user
    const validPassword = await bcrypt.compare(password, user.password);
    if(validPassword) {
        //Now once we are successfully logged in we can store user_id in session cookie
        req.session.user_id = user._id; 
        res.redirect('/secret');
    }else{
        res.redirect('/login');
    }
});

//logout route
app.post('/logout', (req, res) => {
    //just change it to null
    req.session.user_id = null;
    res.redirect('/login');
});

//secured route
app.get('/secret', requireLogin, (req, res) => {
    //if in session cookie user_id exist we will allow the access (middlware)
    res.render('secret.ejs');
});

app.get('/topsecret', requireLogin, (req, res) => {
    //if in session cookie user_id exist we will allow the access (middlware)
    res.send('top secret');
});

app.listen(3000, () => {
    console.log("You are listening on Port 3000");
})