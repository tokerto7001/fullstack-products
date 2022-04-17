const express = require('express');
const productRouter = require('./routes/productRouter');
const AppError = require('./utils/appError');
const errorHandler = require('./utils/errorHandler');
const app = express();

require('./db/db');
// parse application/x-www-form-urlencoded (parsing the body of the request)
app.use(express.urlencoded({ extended: false }))
app.use(express.json()); // parsing the request body with the type of raw json

// reject requests without /products end point
// app.use('*', (req, res, next) => {
//   console.log(req.originalUrl);
//   if (!req.originalUrl.includes("/products")) return res.status(404).json("Not found");
//   next();
// });

// add route middleware to convey requests for products
app.use('/products', productRouter);


app.all('*', (req, res, next) => {
    // console.log(req.originalUrl);
    // res.status(404).json(`Can't find ${req.originalUrl} end point for this server!`);

    // const err = new Error(`Can't find ${req.originalUrl} end point for this server!`)
    // err.status = 'fail';
    // err.statusCode = 404;
    // // if the next receives an argument, no matter what it is, express know that it is an error.
    // next(err);

    // Use our own AppError class
    next(new AppError(`Can't find ${req.originalUrl} end point for this server!`, 404));
})



// if we use four parameters in func, express automatically knows that it is an error handling middleware
// app.use((err, req, res, next) => {
//     console.log('--------', err.stack)
//     err.statusCode = err.statusCode || 500;
//     err.status = err.status || 'error'

//     res.status(err.statusCode).json({
//         status : err.status,
//         message: err.message
//     })
// })


app.use(errorHandler);





module.exports = app;