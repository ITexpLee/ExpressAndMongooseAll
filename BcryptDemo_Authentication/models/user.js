const mongoose = require('mongoose');
const {Schema} = mongoose;

//Creating user Schema

const userSchema = Schema({
    username: {
        type: String,
        required: [true, "Username cannot be empty"]
    },
    password: {
        type: String,
        required: [true, "Password cannot be empty"]
    }
});

//creating model

module.exports = mongoose.model('User', userSchema);