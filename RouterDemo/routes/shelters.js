//Importing express
const express = require('express');
const app = express();

//Creating our router object
const router = express.Router();

//Creating all routes
//Index Route (It will take it to other side as /shelters + / = /shelters/)
router.get('/', (req, res) => {
    res.send('Shelter');
});

//Create Router
router.post('/', (req, res) => {
    res.send('Creating Route');
});

//(It will take it other side as /shelters + /:id = /shelters/:id)
//Show Route
router.get('/:id', (req, res) => {
    res.send('Viewing on Shelter');
});

//Edit Route
router.get('/:id/edit', (req, res) => {
    res.send('Editing one Shelter');
});

module.exports = router;

