const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    status: {type: String, enum: ["active", "closed", "declined"]},
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
    },
    applicantions: [{
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'Application'
    }],
    profile: String,
    skills: [],
    internshipType: { type: String, enum: ["In office", "Hybrid", "Remote"] },
    type: { type: String, enum: ["Part-time", "Full-time"] },
    openings: Number,
    startDate: String,
    endDate: String,
    duration: {
      duration: Number,
      scale: { type: String, enum: ["months", "weeks"] },
    },
    responsibilities: String,
    preferences: String,
    womanApplicants: {
      type: Number,
      default: 0
    },
    stipend: {
      type: String,
      amount: String,
      scale: { type: String, enum: ["months", "weeks", "lump-sum"] },
      incentives: {
        amount: Number,
        scale: String,
      },
    },
    perks: String,
    jobOffers: {
      isOffer: {
        type: Number,
        default: 0
      },
      minCTC: Number,
      maxCTC: Number
    },
    coverLetter: {
      questions: [{type: String}],
      assignments: [{type: String}],
      availability: String,
    },
    alternateNumber: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Internship", internshipSchema);
