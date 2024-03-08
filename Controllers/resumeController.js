const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors")
const studentModel = require('../models/studentModel')
const ErrorHandler = require('../utils/ErrorHandler')
const { v4: uuidv4 } = require('uuid');

exports.resume_Page = catchAsyncErrors(async (req, res, next) => {

    const { resume } = req.user

    res.status(200).json({ message: "Secure Resume Page!", resume })

})

// ---------------------------- Education ----------------------------------------

exports.add_education = catchAsyncErrors(async (req, res, next) => {

    const student = req.user
    student.resume.education.push({ ...req.body, id: uuidv4() })
    await student.save()

    res.status(200).json({ message: "Education Added!" })

})

exports.edit_education = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findById(req.user._id).exec()
    const eduIdx = student.resume.education.findIndex((i) => {
        return i.id === req.params.eduid.trim()
    })

    if (eduIdx === -1){
        return next(new ErrorHandler("No education found!", 404))
    }

    student.resume.education[eduIdx] = { ...student.resume.education[eduIdx], ...req.body }
    await student.save()

    res.status(200).json({ message: "Education Updated!" })

})

exports.delete_education = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findById(req.user._id).exec()
    const filterededu = student.resume.education.filter((i) => {
        return i.id !== req.params.eduid.trim()
    })

    student.resume.education = filterededu
    await student.save()

    res.status(200).json({ message: "Education Deleted!" })

})

// ---------------------------- Jobs ----------------------------------------

exports.add_job = catchAsyncErrors(async (req, res, next) => {

    const student = req.user
    student.resume.jobs.push({ ...req.body, id: uuidv4() })
    await student.save()

    res.status(200).json({ message: "Job Added!" })

})

exports.edit_job = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findById(req.user._id).exec()
    const jobIdx = student.resume.jobs.findIndex((i) => {
        return i.id === req.params.jobid.trim()
    })

    if (jobIdx === -1){
        return next(new ErrorHandler("No job found!", 404))
    }

    student.resume.jobs[jobIdx] = { ...student.resume.jobs[jobIdx], ...req.body }
    await student.save()

    res.status(200).json({ message: "Job Updated!" })

})

exports.delete_job = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findById(req.user._id).exec()
    const filteredjob = student.resume.jobs.filter((i) => {
        return i.id !== req.params.jobid.trim()
    })

    student.resume.jobs = filteredjob
    await student.save()

    res.status(200).json({ message: "Job Deleted!" })

})

// ---------------------------- Internships ----------------------------------------

exports.add_internship = catchAsyncErrors(async (req, res, next) => {

    const student = req.user
    student.resume.internships.push({ ...req.body, id: uuidv4() })
    await student.save()

    res.status(200).json({ message: "Internship Added!" })

})

exports.edit_internship = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findById(req.user._id).exec()
    const internshipIdx = student.resume.internships.findIndex((i) => {
        return i.id === req.params.internshipid.trim()
    })

    if (internshipIdx === -1){
        return next(new ErrorHandler("No internship found!", 404))
    }

    student.resume.internships[internshipIdx] = { ...student.resume.internships[internshipIdx], ...req.body }
    await student.save()

    res.status(200).json({ message: "Internship Updated!" })

})

exports.delete_internship = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findById(req.user._id).exec()
    const filteredinternship = student.resume.internships.filter((i) => {
        return i.id !== req.params.internshipid.trim()
    })

    student.resume.internships = filteredinternship
    await student.save()

    res.status(200).json({ message: "Internship Deleted!" })

})

// ---------------------------- Responsibilities ----------------------------------------

exports.add_responsibility = catchAsyncErrors(async (req, res, next) => {

    const student = req.user
    student.resume.responsibilities.push({ ...req.body, id: uuidv4() })
    await student.save()

    res.status(200).json({ message: "Responsibility Added!" })

})

exports.edit_responsibility = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findById(req.user._id).exec()
    const responsibilityIdx = student.resume.responsibilities.findIndex((i) => {
        return i.id === req.params.responsibilityid.trim()
    })

    if (responsibilityIdx === -1){
        return next(new ErrorHandler("No responsibility found!", 404))
    }

    student.resume.responsibilities[responsibilityIdx] = { ...student.resume.responsibilities[responsibilityIdx], ...req.body }
    await student.save()

    res.status(200).json({ message: "Responsibility Updated!" })

})

exports.delete_responsibility = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findById(req.user._id).exec()
    const filteredresponsibility = student.resume.responsibilities.filter((i) => {
        return i.id !== req.params.responsibilityid.trim()
    })

    student.resume.responsibilities = filteredresponsibility
    await student.save()

    res.status(200).json({ message: "Responsibility Deleted!" })

})
 
// ---------------------------- Training / Courses ----------------------------------------

exports.add_course = catchAsyncErrors(async (req, res, next) => {

    const student = req.user
    student.resume.courses.push({ ...req.body, id: uuidv4() })
    await student.save()

    res.status(200).json({ message: "Course Added!" })

})

exports.edit_course = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findById(req.user._id).exec()
    const courseIdx = student.resume.courses.findIndex((i) => {
        return i.id === req.params.courseid.trim()
    })

    if (courseIdx === -1){
        return next(new ErrorHandler("No courses found!", 404))
    }

    student.resume.courses[courseIdx] = { ...student.resume.courses[courseIdx], ...req.body }
    await student.save()

    res.status(200).json({ message: "Course Updated!" })

})

exports.delete_course = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findById(req.user._id).exec()
    const filteredcourses = student.resume.courses.filter((i) => {
        return i.id !== req.params.courseid.trim()
    })

    student.resume.courses = filteredcourses
    await student.save()

    res.status(200).json({ message: "Course Deleted!" })

})

// ---------------------- Academics / Personal Projects ----------------------

exports.add_project = catchAsyncErrors(async (req, res, next) => {

    const student = req.user
    student.resume.projects.push({ ...req.body, id: uuidv4() })
    await student.save()

    res.status(200).json({ message: "Project Added!" })

})

exports.edit_project = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findById(req.user._id).exec()
    const projectIdx = student.resume.projects.findIndex((i) => {
        return i.id === req.params.projectid.trim()
    })

    if (projectIdx === -1){
        return next(new ErrorHandler("No projects found!", 404))
    }

    student.resume.projects[projectIdx] = { ...student.resume.projects[projectIdx], ...req.body }
    await student.save()

    res.status(200).json({ message: "Project Updated!" })

})

exports.delete_project = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findById(req.user._id).exec()
    const filteredprojects = student.resume.projects.filter((i) => {
        return i.id !== req.params.projectid.trim()
    })

    student.resume.projects = filteredprojects
    await student.save()

    res.status(200).json({ message: "Project Deleted!" })

})

// ---------------------- Skills ----------------------

exports.add_skill = catchAsyncErrors(async (req, res, next) => {

    const student = req.user
    student.resume.skills.push({ ...req.body, id: uuidv4() })
    await student.save()

    res.status(200).json({ message: "Skill Added!" })

})

exports.edit_skill = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findById(req.user._id).exec()
    const skillIdx = student.resume.skills.findIndex((i) => {
        return i.id === req.params.skillid.trim()
    })

    if (skillIdx === -1){
        return next(new ErrorHandler("No skills found!", 404))
    }

    student.resume.skills[skillIdx] = { ...student.resume.skills[skillIdx], ...req.body }
    await student.save()

    res.status(200).json({ message: "Skill Updated!" })

})

exports.delete_skill = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findById(req.user._id).exec()
    const filteredskills = student.resume.skills.filter((i) => {
        return i.id !== req.params.skillid.trim()
    })

    student.resume.skills = filteredskills
    await student.save()

    res.status(200).json({ message: "Skill Deleted!" })

})

// ---------------------- Add Portfolio / Work Sample ----------------------

exports.add_worksample = catchAsyncErrors(async (req, res, next) => {

    const student = req.user
    student.resume.worksamples.push({ ...req.body, id: uuidv4() })
    await student.save()

    res.status(200).json({ message: "Worksample Added!" })

})

exports.edit_worksample = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findById(req.user._id).exec()
    const worksampleIdx = student.resume.worksamples.findIndex((i) => {
        return i.id === req.params.worksampleid.trim()
    })

    if (worksampleIdx === -1){
        return next(new ErrorHandler("No worksamples found!", 404))
    }

    student.resume.worksamples[worksampleIdx] = { ...student.resume.worksamples[worksampleIdx], ...req.body }
    await student.save()

    res.status(200).json({ message: "Worksample Updated!" })

})

exports.delete_worksample = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findById(req.user._id).exec()
    const filteredworksamples = student.resume.worksamples.filter((i) => {
        return i.id !== req.params.worksampleid.trim()
    })

    student.resume.worksamples = filteredworksamples
    await student.save()

    res.status(200).json({ message: "Worksample Deleted!" })

})

// ---------------------- Add Accomplishment / Additional Detail ----------------------

exports.add_accomplishment = catchAsyncErrors(async (req, res, next) => {

    const student = req.user
    student.resume.accomplishments.push({ ...req.body, id: uuidv4() })
    await student.save()

    res.status(200).json({ message: "Accomplishment Added!" })

})

exports.edit_accomplishment = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findById(req.user._id).exec()
    const accomplishmentIdx = student.resume.accomplishments.findIndex((i) => {
        return i.id === req.params.accomplishmentid.trim()
    })

    if (accomplishmentIdx === -1){
        return next(new ErrorHandler("No accomplishments found!", 404))
    }

    student.resume.accomplishments[accomplishmentIdx] = { ...student.resume.accomplishments[accomplishmentIdx], ...req.body }
    await student.save()

    res.status(200).json({ message: "Accomplishment Updated!" })

})

exports.delete_accomplishment = catchAsyncErrors(async (req, res, next) => {

    const student = await studentModel.findById(req.user._id).exec()
    const filteredaccomplishments = student.resume.accomplishments.filter((i) => {
        return i.id !== req.params.accomplishmentid.trim()
    })

    student.resume.accomplishments = filteredaccomplishments
    await student.save()

    res.status(200).json({ message: "Accomplishment Deleted!" })

})