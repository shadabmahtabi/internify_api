const express = require('express');
const { resume_Page, add_education, edit_education, delete_education, add_job, edit_job, delete_job, add_internship, edit_internship, delete_internship, add_responsibility, edit_responsibility, delete_responsibility, add_course, edit_course, delete_course, add_project, edit_project, delete_project, add_skill, edit_skill, delete_skill, add_worksample, edit_worksample, delete_worksample, add_accomplishment, edit_accomplishment, delete_accomplishment } = require('../Controllers/resumeController');
const { isAuthenticated } = require('../middlewares/auth_student');
const router = express.Router();

// GET /resume
router.get('/', isAuthenticated, resume_Page)

// ---------------------------- Education ----------------------------------------

// POST /resume/add-edu
router.post('/add-edu', isAuthenticated, add_education)

// POST /resume/edit-edu/:eduid
router.post('/edit-edu/:eduid', isAuthenticated, edit_education)

// POST /resume/delete-edu/:eduid
router.post('/delete-edu/:eduid', isAuthenticated, delete_education)

// ---------------------------- Jobs ----------------------------------------

// POST /resume/add-job
router.post('/add-job', isAuthenticated, add_job)

// POST /resume/edit-job/:jobid
router.post('/edit-job/:jobid', isAuthenticated, edit_job)

// POST /resume/delete-job/:jobid
router.post('/delete-job/:jobid', isAuthenticated, delete_job)

// ---------------------------- Internships ----------------------------------------

// POST /resume/add-internship
router.post('/add-internship', isAuthenticated, add_internship)

// POST /resume/edit-internship/:internshipid
router.post('/edit-internship/:internshipid', isAuthenticated, edit_internship)

// POST /resume/delete-internship/:internshipid
router.post('/delete-internship/:internshipid', isAuthenticated, delete_internship)

// ---------------------------- Responsibilities ----------------------------------------

// POST /resume/add-responsibilities
router.post('/add-responsibilities', isAuthenticated, add_responsibility)

// POST /resume/edit-responsibilities/:responsibilityid
router.post('/edit-responsibilities/:responsibilityid', isAuthenticated, edit_responsibility)

// POST /resume/delete-responsibilities/:responsibilityid
router.post('/delete-responsibilities/:responsibilityid', isAuthenticated, delete_responsibility)

// ---------------------------- Training / Courses ----------------------------------------

// POST /resume/add-courses
router.post('/add-courses', isAuthenticated, add_course)

// POST /resume/edit-courses/:courseid
router.post('/edit-courses/:courseid', isAuthenticated, edit_course)

// POST /resume/delete-courses/:courseid
router.post('/delete-courses/:courseid', isAuthenticated, delete_course)
 
// ---------------------- Academics / Personal Projects ----------------------

// POST /resume/add-projects
router.post('/add-projects', isAuthenticated, add_project)

// POST /resume/edit-projects/:projectid
router.post('/edit-projects/:projectid', isAuthenticated, edit_project)

// POST /resume/delete-projects/:projectid
router.post('/delete-projects/:projectid', isAuthenticated, delete_project)

// ---------------------- Skills ----------------------

// POST /resume/add-skills
router.post('/add-skills', isAuthenticated, add_skill)

// POST /resume/edit-skills/:skillid
router.post('/edit-skills/:skillid', isAuthenticated, edit_skill)

// POST /resume/delete-skills/:skillid
router.post('/delete-skills/:skillid', isAuthenticated, delete_skill)

// ---------------------- Add Portfolio / Work Sample ----------------------

// POST /resume/add-worksamples
router.post('/add-worksamples', isAuthenticated, add_worksample)

// POST /resume/edit-worksamples/:worksampleid
router.post('/edit-worksamples/:worksampleid', isAuthenticated, edit_worksample)

// POST /resume/delete-worksamples/:worksampleid
router.post('/delete-worksamples/:worksampleid', isAuthenticated, delete_worksample)

// ---------------------- Add Accomplishment / Additional Detail ----------------------

// POST /resume/add-accomplishments
router.post('/add-accomplishments', isAuthenticated, add_accomplishment)

// POST /resume/edit-accomplishments/:accomplishmentid
router.post('/edit-accomplishments/:accomplishmentid', isAuthenticated, edit_accomplishment)

// POST /resume/delete-accomplishments/:accomplishmentid
router.post('/delete-accomplishments/:accomplishmentid', isAuthenticated, delete_accomplishment)

module.exports = router;