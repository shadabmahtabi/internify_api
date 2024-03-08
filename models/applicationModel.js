const mongoose = require("mongoose");

var applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    questions: [{ question: String, answer: String }],
    assignments: [{ assignment: String, answer: String, link: String }],
    availability: {
      answer: { type: String, enum: ["yes", "no"] },
      description: String,
    },
    customResume: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema)