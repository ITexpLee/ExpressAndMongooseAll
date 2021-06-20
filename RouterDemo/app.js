const express = require('express');
const app = express();

//Adding cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

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

app.listen(3000, () => {
    console.log('listening');
})