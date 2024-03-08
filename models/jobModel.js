const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    status: {type: String, enum: ["active", "closed", "declined"]},
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
    },
    title: String,
    skills: [],
    jobType: { type: String, enum: ["In office", "Hybrid", "Remote"] },
    type: { type: String, enum: ["Part-time", "Full-time"] },
    openings: Number,
    responsibilities: String,
    preferences: String,
    salary: {
      type: String,
      amount: String,
    },
    probationPeriod: {
      duration: String,
      salary: String
    },
    perks: String,
    coverLetter: {
      question: String,
      availability: String,
      assessments: []
    },
    alternateNumber: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
