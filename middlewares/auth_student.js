const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/ErrorHandler')
const {catchAsyncErrors} = require('./catchAsyncErrors')
const studentModel = require('../models/studentModel')

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const {token} = req.cookies

    if (!token){
        return next(new ErrorHandler('Please login to access!', 401))
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    
    const user = await studentModel.findById(id).exec()
    if(user.internships.length > 0) {
        await user.populate("internships")
    }
    if(user.jobs.length > 0) {
        await user.populate("jobs")
    }

    req.user = user
    // console.log(user)
    next()
})