//Importing express
const express = require('express');
const app = express();
const router = express.Router();

//Adding middleWare to check
router.use( (req, res, next) => {
    //If next is not called then only res.send will be executed
    if(req.query.isAdmin) {
        next();
    }
    res.send("Sorry Not a Admin");
});

router.get('/topsecret', (req, res) => {
    res.send('THis is top Secret');
});

router.get('/deleteeverything', (req, res) => {
    res.send('Ok ALL Deleted');
});

module.exports = router;