const express = require('express');
const { Homepage, employeeSignup, Profilepage, employeeLogin, employeeLogout, employeeSendMail, employeeForgetLink, employeeResetPassword, employeeUpdate, employeeOrganizationLogo, employeeDashboard, employeeDelete } = require('../Controllers/employeeConroller');
const { isAuthenticated } = require('../middlewares/auth_employee');
const router = express.Router();

// GET /
router.get('/', Homepage)

// GET /
router.get('/dashboard', isAuthenticated, employeeDashboard)

//  POST /employee/signup
router.post('/signup', employeeSignup)

//  POST /employee/login
router.post('/login', employeeLogin)

//  GET /employee/logout
router.get('/logout', isAuthenticated, employeeLogout)

//  POST /employee/send-mail
router.post('/send-mail', employeeSendMail)

//  POST /employee/forget-link
router.post('/forget-link/:id', employeeForgetLink)

//  POST /employee/reset-password
router.post('/reset-password', isAuthenticated, employeeResetPassword)

//  POST /employee/update/:id
router.post('/update/:id', isAuthenticated, employeeUpdate)

//  POST /employee/avatar
router.post('/avatar', isAuthenticated, employeeOrganizationLogo)

//  POST /employee/delete-account
router.post('/delete-account', isAuthenticated, employeeDelete)

module.exports = router;