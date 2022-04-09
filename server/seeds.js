const mongoose = require('mongoose');
const Product = require('./models/products');

const connectFunction = () => {
    mongoose.connect('mongodb://localhost:27017/productApp')
    .then(() => console.log('Connected to the db'))
    .catch(err => console.log(err.message))
}
connectFunction();

Product.insertMany([
    {
        name : 'Fairy Eggplant',
        price : 1,
        category : 'vegetable',
    },
    {
        name : 'Organic Goddes Melon',
        price : 5,
        category : 'fruit',
    },
    {
        name : 'Orange',
        price : 3,
        category : 'fruit',
    },
    {
        name : 'Chocolate Whole Milk',
        price : 6,
        category : 'dairy',
    },
    {
        name : 'Organic Celery',
        price : 5.90,
        category : 'vegetable',
    },
]).then(() => console.log('inserted successfuly'))
.catch(err => console.log(err.message))
