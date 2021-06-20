const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationship', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Mongo Connection Open!!");
    })
    .catch(err => {
        console.log("OHH Noo Mongo Connection Error!");
        console.log(err);
    });

//Defining schema for a user
const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [{
        _id: {id: false},
        street: String,
        city: String,
        state: String,
        country: {
            type: String,
            required: true
        }

    }]
});

const User = mongoose.model('User', userSchema);

//Creating a user instance having an embbeded schema
const makeUser = async () => {
    const u = new User({first: 'Hairy', last: 'Puttar'});
    u.addresses.push({
        street: '123 Seasome Street',
        city: 'New York',
        state: 'New York',
        country: 'USA'
    });
    const res = await u.save();
    console.log(res);
}

// makeUser();
//Inserting addresses for already there user

const addAddress = async (id) => {
    const user = await User.findById(id);
    user.addresses.push({
        street: '112 Baker Street',
        city: 'New Yorkshire',
        state: 'New York',
        country: 'England'
    });
    const res = await user.save();
    console.log(res);
}

addAddress('60cb0acf39c2a735780ddbd1');