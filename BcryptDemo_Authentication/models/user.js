const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

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

//Model method or static method
userSchema.statics.findAndValidate = async function(username, password) {
    const foundUser = await this.findOne({username: username});
    //Compare takes string password entered by user and hashed password in DB
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
}

//Adding mongoose middleware before the action save takes place hash and store password in db
userSchema.pre('save', async function (next) {
    //we check if the password string entered by user is modified or not
    if (!this.isModified('password')) return next();
    //we replace the string password with hashed password instead 
    this.password = await bcrypt.hash(this.password, 12);
    next();
})


//creating model

module.exports = mongoose.model('User', userSchema);