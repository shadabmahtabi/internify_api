const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/ErrorHandler')
const {catchAsyncErrors} = require('./catchAsyncErrors')
const employeeModel = require('../models/employeeModel')

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const {token} = req.cookies

    if (!token){
        return next(new ErrorHandler('Please login to access!', 401))
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    
    const user = await employeeModel.findById(id).exec()
    await user.populate("internships")
    await user.populate("jobs")

    req.user = user
    // console.log(user)
    next()
})