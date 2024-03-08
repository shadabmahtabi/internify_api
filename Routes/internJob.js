const express = require('express')
const employee = require('../middlewares/auth_employee');
const student = require('../middlewares/auth_student')
const { createInternship, closeInternship, updateInternship, readInternships, createjob, updatejob, closejob, readjobs, readSingleInternship, readSingleJob, applyjob, applyinternship } = require('../Controllers/internJobController');
const router = express.Router()

// ----------------------------- Internships -----------------------------

// POST /internjob/internships/create
router.post('/internships/create', employee.isAuthenticated, createInternship)

// POST /internjob/internships/update/:internId
router.post('/internships/update/:internId', employee.isAuthenticated, updateInternship)

// GET /internjob/internships/close/:internId
router.get('/internships/close/:internId', employee.isAuthenticated, closeInternship)

// GET /internjob/internships
router.get('/internships', readInternships)

// GET /internjob/internships/:internId
router.get('/internships/:internId', employee.isAuthenticated, readSingleInternship)

// POST /internjob/internships/apply/:internshipid
router.post('/internships/apply/:internshipid', student.isAuthenticated, applyinternship)

// ----------------------------- Jobs -----------------------------

// POST /internjob/jobs/create
router.post('/jobs/create', employee.isAuthenticated, createjob)

// POST /internjob/jobs/update/:jobId
router.post('/jobs/update/:jobId', employee.isAuthenticated, updatejob)

// GET /internjob/jobs/close/:jobId
router.get('/jobs/close/:jobId', employee.isAuthenticated, closejob)

// GET /internjob/jobs
router.get('/jobs', employee.isAuthenticated, readjobs) 

// GET /internjob/jobs/:jobId
router.get('/jobs/:jobId', employee.isAuthenticated, readSingleJob) 

// POST /internjob/jobs/apply/:jobid
router.post('/jobs/apply/:jobid', student.isAuthenticated, applyjob)

module.exports = router