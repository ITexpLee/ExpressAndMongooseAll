const {
    urlencoded
} = require('express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
//Adding bcrypt 
const bcrypt = require('bcrypt');

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
app.use(express.urlencoded({
    extended: true
}));

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
        res.send('Yay welcome');
    }else{
        res.send('try again');
    }
});

//secured route
app.get('/secret', (req, res) => {
    res.send('You cannot see me until you are signed In');
});

app.listen(3000, () => {
    console.log("You are listening on Port 3000");
})