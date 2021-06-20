const express = require('express');
const app = express();
const router = express.Router();

//Creating all routes
//Index Route (It will take it to other side as /shelters + / = /shelters/)
router.get('/', (req, res) => {
    res.send('Index Route of Dogs');
});

//Create Router
router.post('/', (req, res) => {
    res.send('Create Route for Dogs');
});

//(It will take it other side as /shelters + /:id = /shelters/:id)
//Show Route
router.get('/:id', (req, res) => {
    res.send('Showing all Dogs');
});

//Edit Route
router.get('/:id/edit', (req, res) => {
    res.send('Editing one of the Dogs');
});

module.exports = router;