const express = require('express');
const productRouter = require('./routes/productRouter');
const app = express();

require('./db/db');

// parse application/x-www-form-urlencoded (parsing the body of the request)
app.use(express.urlencoded({ extended: false }))
app.use(express.json()); // parsing the request body with the type of raw json

// reject requests without /products end point
app.use('*', (req, res, next) => {
  console.log(req.originalUrl);
  if (!req.originalUrl.includes("/products")) return res.status(404).json("Not found");
  next();
});

// add route middleware to convey requests for products
app.use('/products', productRouter);

app.use('*', (req, res, next) => {
    res.status(404).json(`Can't find ${req.originalUrl} end point for this server!`);
});



module.exports = app;