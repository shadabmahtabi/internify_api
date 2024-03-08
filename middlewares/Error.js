exports.generatedErrors = (err, req, res, next) => {

    const statusCode = err.statusCode || 500;

    if(err.name === "MongoServerError" && err.message.includes('duplicate key error collection')){
        err.message = 'User already exists with this email.'
    }

    res.status(statusCode).json({
        message: err.message,
        errorName: err.name,
        // stack: err.stack
    })
}