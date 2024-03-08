const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const employeeModel = require("../models/employeeModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/Sendtoken");
const { sendmail } = require("../utils/nodemailer");
const imageKit = require("../utils/imagekit").initImagekit();
const path = require("path");

exports.Homepage = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ message: "Secure Employee Profile Page!" });
});

exports.employeeDashboard = catchAsyncErrors(async (req, res, next) => {
  // const {internships} = await employeeModel.findById(req.user._id).populate("internships")
  // const {internships} = await req.user.populate("internships")

  res.status(200).json(req.user);
});

exports.employeeSignup = catchAsyncErrors(async (req, res, next) => {
  const employee = await new employeeModel(req.body).save();
  // res.status(201).json(employee)

  sendtoken(employee, 201, res);
});

exports.employeeLogin = catchAsyncErrors(async (req, res, next) => {
  const employee = await employeeModel
    .findOne({ email: req.body.email })
    .select("+password")
    .exec();

  if (!employee) {
    return next(new ErrorHandler("No employee found with this email", 404));
  }

  const isMatch = employee.comparepassword(req.body.password)
  
  if (!isMatch) return next(new ErrorHandler("Wrong Credentials", 500))
  
//   res.json(isMatch)
  sendtoken(employee, 200, res)
});

exports.employeeLogout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Successfully logout" });
});

exports.employeeSendMail = catchAsyncErrors(async (req, res, next) => {

    const employee = await employeeModel.findOne({ email: req.body.email }).exec()

    if (!employee) {
        return next(new ErrorHandler("No employee found with this email", 404))
    }

    const url = `${req.protocol}://${req.get('host')}/employee/forget-link/${employee._id}`

    sendmail(req, res, next, url)

    employee.resetPasswordToken = '1'
    await employee.save()

    res.status(200).json({ url })

})

exports.employeeForgetLink = catchAsyncErrors(async (req, res, next) => {

    const employee = await employeeModel.findById(req.params.id).exec()

    if (!employee) {
        return next(new ErrorHandler("No employee found with this email", 404))
    }

    if (employee.resetPasswordToken == '1') {
        employee.resetPasswordToken = '0'
        employee.password = req.body.password
        await employee.save()
    }
    else {
        return next(new ErrorHandler("Invalid Reset Password Link, Please Try Again", 500))
    }

    res.status(200).json({ message: 'Password has been changed successfully.' })

})

exports.employeeResetPassword = catchAsyncErrors(async (req, res, next) => {

    // const employee = await employeeModel.findById(req.params.id).exec()
    const employee = req.user

    employee.password = req.body.password
    await employee.save()

    sendtoken(employee, 201, res)

})

exports.employeeUpdate = catchAsyncErrors(async (req, res, next) => {

    const employee = await employeeModel.findByIdAndUpdate(req.user._id, req.body).exec()

    res.status(200).json({
        message: 'employee Updated Successfully',
        employee
    })

})

exports.employeeOrganizationLogo = catchAsyncErrors(async (req, res, next) => {

    const employee = req.user
    const file = req.files.logo

    const modified_filename = `resumebuilder-${Date.now()}${path.extname(file.name)}`

    if (employee.organizationLogo.fileId !== ''){
        await imageKit.deleteFile(employee.organizationLogo.fileId)
    }

    const { fileId, url } = await imageKit.upload({
        file: file.data,
        fileName: modified_filename
    })

    employee.organizationLogo = { fileId, url }
    await employee.save()

    res.status(200).json({
        message: 'Profile Updated Successfully',
    })

})

exports.employeeDelete = catchAsyncErrors(async (req, res, next) => {
  const employee = await employeeModel
    .findOneAndDelete({ email: req.body.email })
    .select("+password")
    .exec();

  if (!employee) {
    return next(new ErrorHandler("No employee found with this email", 404));
  }

  const isMatch = employee.comparepassword(req.body.password)
  
  if (!isMatch) return next(new ErrorHandler("Wrong Credentials", 500))
  
//   res.json(isMatch)
  sendtoken(employee, 200, res)
});