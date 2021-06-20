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

const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});

//Creating our farm Schema

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

//Creating model for product
const Product = mongoose.model('Product', productSchema);

//Creating model for Farms
const Farm = mongoose.model('Farm', farmSchema);

const products = async () => {
    const res = await Product.insertMany([{
            name: 'Godess Melon',
            price: 4.99,
            season: 'Summer'
        },
        {
            name: 'Sugar Melon',
            price: 5.99,
            season: 'Fall'
        },
        {
            name: 'Baby melon',
            price: 3.99,
            season: 'Winter'
        },
    ]);
    console.log(res);
}

// products();
const makeFarm = async () => {
    //Creating farm collection
    const farm = new Farm({
        name: 'Full Belly Farm',
        city: 'Guinda, California'
    });
    //Fetch products
    const melon = await Product.findOne({name: 'Godess Melon'});
    //Pushing this product_id into farm
    farm.products.push(melon);
    const res = await farm.save();
    console.log(farm);
}

// makeFarm();

//last adding one more

const addProduct = async () => {
    const farm = await Farm.findOne({name: 'Full Belly Farm'});
    const product = await Product.findOne({name: 'Baby melon'});
    farm.products.push(product);
    const res = await farm.save();
    console.log(res);
};

// addProduct();

//Let us find our Farm
//As it is thenable we can add .then to get the data
// Farm.findOne({name: 'Full Belly Farm'}).populate('products').then(farm => console.log(farm));
