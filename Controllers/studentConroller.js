const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors")
const studentModel = require('../models/studentModel')
const ErrorHandler = require('../utils/ErrorHandler')
const { sendtoken } = require("../utils/Sendtoken")
const { sendmail } = require("../utils/nodemailer")
const imageKit = require("../utils/imagekit").initImagekit() 
const path = require('path')

exports.Homepage = catchAsyncErrors(async (req, res, next) => {

    res.status(200).json({ message: "Secure Homepage!" })

})

exports.Profilepage = catchAsyncErrors(async (req, res, next) => {

    // const student = await studentModel.findById(req.id).exec()
    res.status(200).json(req.user)

})

exports.studentSignup = catchAsyncErrors(async (req, res, next) => {

    const student = await new studentModel(req.body).save()
    // res.status(201).json(student)

    sendtoken(student, 201, res)

})

exports.studentLogin = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findOne({ email: req.body.email })
        .select('+password')
        .exec()

    if (!student) {
        return next(new ErrorHandler("No Student found with this email", 404))
    }

    const isMatch = student.comparepassword(req.body.password)

    if (!isMatch) return next(new ErrorHandler("Wrong Credentials", 500))

    // res.json(student)
    sendtoken(student, 200, res)

})

exports.studentLogout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie('token')
    res.json({ message: 'Successfully logout' })
})

exports.studentSendMail = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findOne({ email: req.body.email }).exec()

    if (!student) {
        return next(new ErrorHandler("No Student found with this email", 404))
    }

    const url = `${req.protocol}://${req.get('host')}/student/forget-link/${student._id}`

    sendmail(req, res, next, url)

    student.resetPasswordToken = '1'
    await student.save()

    res.status(200).json({ url })

})

exports.studentForgetLink = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findById(req.params.id).exec()

    if (!student) {
        return next(new ErrorHandler("No Student found with this email", 404))
    }

    if (student.resetPasswordToken == '1') {
        student.resetPasswordToken = '0'
        student.password = req.body.password
        await student.save()
    }
    else {
        return next(new ErrorHandler("Invalid Reset Password Link, Please Try Again", 500))
    }

    res.status(200).json({ message: 'Password has been changed successfully.' })

})

exports.studentResetPassword = catchAsyncErrors(async (req, res, next) => {

    // const student = await studentModel.findById(req.params.id).exec()
    const student = req.user

    student.password = req.body.password
    await student.save()

    sendtoken(student, 201, res)

})

exports.studentUpdate = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findByIdAndUpdate(req.user._id, req.body).exec()

    res.status(200).json({
        message: 'Student Updated Successfully',
        student
    })

})

exports.studentAvatar = catchAsyncErrors(async (req, res, next) => {

    const student = req.user
    const file = req.files.avatar

    const modified_filename = `resumebuilder-${Date.now()}${path.extname(file.name)}`

    if (student.avatar.fileId !== ''){
        await imageKit.deleteFile(student.avatar.fileId)
    }

    const { fileId, url } = await imageKit.upload({
        file: file.data,
        fileName: modified_filename
    })

    student.avatar = { fileId, url }
    await student.save()

    res.status(200).json({
        message: 'Profile Updated Successfully',
    })

})
