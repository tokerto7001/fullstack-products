const catchError = func => {
    console.log('catchError');
    return (req, res, next) => {
        console.log('runs when requested')
        func(req, res, next).catch(err => next(err))
    }
}

module.exports = catchError;