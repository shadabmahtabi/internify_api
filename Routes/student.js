const express = require('express');
const { Homepage, studentSignup, studentLogin, studentLogout, Profilepage, studentSendMail,studentForgetLink, studentResetPassword, studentUpdate, studentAvatar } = require('../Controllers/studentConroller');
const { isAuthenticated } = require('../middlewares/auth_student');
const router = express.Router();

// GET /
router.get('/', Homepage)

// GET /student/profile
router.get('/student/profile', isAuthenticated, Profilepage)

//  POST /student/signup
router.post('/student/signup', studentSignup)

//  POST /student/login
router.post('/student/login', studentLogin)

//  GET /student/signup
router.get('/student/logout', isAuthenticated, studentLogout)

//  POST /student/send-mail
router.post('/student/send-mail', studentSendMail)

//  POST /student/forget-link
router.post('/student/forget-link/:id', studentForgetLink)

//  POST /student/reset-password
router.post('/student/reset-password', studentResetPassword)

//  POST /student/update/:id
router.post('/student/update/:id', isAuthenticated, studentUpdate)

//  POST /student/avatar
router.post('/student/avatar', isAuthenticated, studentAvatar)

module.exports = router;