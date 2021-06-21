const express = require('express');
const app = express();

//Adding cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser('thisismysecret'));

//Cookie example
app.get('/greet', (req, res) => {
    const {name = 'Anunay'} = req.cookies;
    res.send(`Hey there ${name}`);
});

app.get('/setname', (req, res) => {
    //Setting up cookie
    res.cookie('name', 'Steve singh');
    res.cookie('animal', 'Lion');
    res.send('Sent you a cookie');
});

//Signed Cookieess
app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', {signed: true});
    res.send('Singed your fruit cookie');
});

//Validating signed cookies
app.get('/verifyfruit', (req, res) => {
     console.log(req.cookies);
     console.log(req.signedCookies);
     res.send(req.signedCookies);
});

app.listen(3000, () => {
    console.log('listening');
})