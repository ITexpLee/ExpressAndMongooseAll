//Importing express
const express = require('express');
const app = express();

//Requiring all Created Routes
const shelterRoutes = require('./routes/shelters.js');
const dogRoutes = require('./routes/dogs.js');

//Middleware for Routes
app.use('/shelters', shelterRoutes);
app.use('/dogs', dogRoutes);

app.listen(3000, () => {
    console.log("YOU ARE LISTENING On PORT: 3000");
})