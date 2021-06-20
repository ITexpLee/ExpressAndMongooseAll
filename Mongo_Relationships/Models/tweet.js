const express = require('express');
const app = express();
const mongoose = require('mongoose');
//Most of the times we pull out mongoose.Schema
const {
    Schema
} = mongoose;
// or we can write as const Schema = mongoose.Schema we destructured here

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

//Creating our User Schema Parent(Schema)
const userSchema = new Schema({
    username: String,
    age: Number,
});

//Creating our Tweet Schema Child(Schema)
const tweetSchema = new Schema({
    text: {
        type: String,
        max: 40
    },
    likes: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

//Creating both the Models
const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

//Creating the document for the collection or instances for the model
const makeTweets = async () => {
    // const user = new User({username: 'ChickenFan99', age: 61});
    const user = await User.findOne({username: 'ChickenFan99'});
    const tweet2 = new Tweet({text: 'Yeahhh chicken is life bruh', likes: 20});
    tweet2.user = user;
    tweet2.save();
}

// makeTweets();

//Now let's populate the tweet or find the users/ user who did the tweets

const findTweet = async () => {
    const t = await Tweet.find({}).populate('user');
    console.log(t);
}

findTweet();