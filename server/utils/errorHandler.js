const AppError = require('./appError')

const devError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err
    })
}

const prodError = (err, res) => {
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }else {
        res.status(500).json({
            status : 'error',
            message : 'Something went wrong !'
        })
    }
}

const handleCastErrorDb = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`
    return new AppError(message, 400)
}

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(el => el.message) // birden fazla error olursa
    // const message = `Invalid input data. ${err.message}`
    const message = `Invalid input data. ${errors.join('. ')}` // birden fazla error olursa
    return new AppError(message, 400)
} 




module.exports = (err, req, res, next) => {
    //console.log('--------', err.stack)
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {
        devError(err, res)
    } else if (process.env.NODE_ENV === 'production') {
        let error = err;
        if(err.name === 'CastError') error = handleCastErrorDb(err)
        if(err.name === 'ValidationError') error = handleValidationErrorDB(err)
        prodError(error, res)
    }

    // if(process.env.NODE_ENV === 'development'){
    //     res.status(err.statusCode).json({
    //         status : err.status,
    //         message: err.message,
    //         stack: err.stack,
    //         error: err
    //     })

    // }else if (process.env.NODE_ENV === 'production'){
    //     res.status(err.statusCode).json({
    //         status : err.status,
    //         message: err.message
    //     })
    // }

}