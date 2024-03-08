const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const employeeModel = require("../models/employeeModel");
const studentModel = require("../models/studentModel");
const internshipModel = require("../models/internshipModel");
const jobModel = require("../models/jobModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/nodemailer");
const applicationModel = require("../models/applicationModel");

// ----------------------------- Internships -----------------------------

exports.createInternship = catchAsyncErrors(async (req, res, next) => {
  const employee = req.user;
  const internship = new internshipModel(req.body);
  internship.status = "active";
  internship.employee = employee._id;
  await internship.save();
  employee.internships.push(internship._id);
  await employee.save();

  res.status(201).json(internship);
  // res.json(req.user)
});

exports.closeInternship = catchAsyncErrors(async (req, res, next) => {
  const internship = await internshipModel.findById(req.params.internId);

  if (!internship) return new ErrorHandler("Internship not found!", 404);

  internship.status = "closed";
  await internship.save();

  res.status(200).json(internship);
});

exports.updateInternship = catchAsyncErrors(async (req, res, next) => {
  const internship = await internshipModel
    .findByIdAndUpdate(req.params.internId, req.body)
    .exec();

  if (!internship) return new ErrorHandler("Internship not found!", 404);

  res.status(200).json({ internship });
});

exports.readInternships = catchAsyncErrors(async (req, res, next) => {
  const internships = await internshipModel.find().exec();

  if (!internships) return new ErrorHandler("Internships not found!", 404);

  res.status(200).json(internships);
});

exports.readSingleInternship = catchAsyncErrors(async (req, res, next) => {
  const internship = await internshipModel
    .findOne({ _id: req.params.internId })
    .exec();

  if (!internship) return new ErrorHandler("Internship not found!", 404);

  res.status(200).json(internship);
});

exports.applyinternship = catchAsyncErrors(async (req, res, next) => {
  const internship = await internshipModel
    .findById(req.params.internshipid)
    .exec();
  if (internship.status === "closed" || job.status === "declined") {
    return res.status(200).json("Intership is closed. You can't apply now.");
  }

  const application = new applicationModel({
    student: req.user._id,
    internship: req.params.internshipid,
  });
  application.questions.push({
    question: req.body.question1,
    answer: req.body.answer1,
  });
  (application.availability.answer = "yes"),
    (application.availability.description = "Immediately");
  await application.save();

  internship.applicantions.push(application._id);
  req.user.internships.push(req.params.internshipid);
  await internship.save();
  await req.user.save();

  res.status(200).json(application);
});

// ----------------------------- Jobs -----------------------------

exports.createjob = catchAsyncErrors(async (req, res, next) => {
  const employee = req.user;
  const job = new jobModel(req.body);
  job.status = "active";
  job.employee = employee._id;
  await job.save();
  employee.jobs.push(job._id);
  await employee.save();

  res.status(201).json(job);
  // res.json(req.user)
});

exports.closejob = catchAsyncErrors(async (req, res, next) => {
  const job = await jobModel.findById(req.params.jobId);

  if (!job) return new ErrorHandler("Job not found!", 404);

  job.status = "closed";
  await job.save();

  res.status(200).json(job);
});

exports.updatejob = catchAsyncErrors(async (req, res, next) => {
  const job = await jobModel
    .findByIdAndUpdate(req.params.jobId, req.body)
    .exec();

  if (!job) return new ErrorHandler("job not found!", 404);

  res.status(200).json({ job });
});

exports.readjobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await jobModel.find().exec();

  if (!jobs) return new ErrorHandler("Jobs not found!", 404);

  res.status(200).json(jobs);
});

exports.readSingleJob = catchAsyncErrors(async (req, res, next) => {
  const job = await jobModel.findOne({ _id: req.params.jobId }).exec();

  if (!job) return new ErrorHandler("Job not found!", 404);

  res.status(200).json(job);
});

exports.applyjob = catchAsyncErrors(async (req, res, next) => {

  const job = await jobModel
    .findById(req.params.jobid)
    .exec();
  if (job.status === "closed" || job.status === "declined") {
    return res.status(200).json("Job is closed. You can't apply now.");
  }

  const application = new applicationModel({
    student: req.user._id,
    job: req.params.jobid,
  });
  application.questions.push({
    question: req.body.question1,
    answer: req.body.answer1,
  });
  (application.availability.answer = "yes"),
    (application.availability.description = "Immediately");
  await application.save();

  job.applicantions.push(application._id);
  req.user.jobs.push(req.params.jobid);
  await job.save();
  await req.user.save();

  res.status(200).json(application);
});
