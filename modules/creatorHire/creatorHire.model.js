const mongoose = require("mongoose");

const creatorHireSchema = new mongoose.Schema({

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  projectTitle: String,
  category: String,
  description: String,

  objectives: String,
  deliverables: String,

  roleRequired: String,
  experienceLevel: String,
  skills: [String],

  budgetType: String,
  budgetRange: String,
  paymentMethod: String,

  timelineStart: Date,
  timelineEnd: Date,

  workType: String,
  location: String,
  timeZone: String,

  applicants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    coverLetter: String,
    proposedRate: Number,
    portfolio: [String],
    status: {
      type: String,
      enum: [
        "pending",
        "shortlisted",
        "interview",
        "accepted",
        "rejected"
      ],
      default: "pending"
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],

  visibility: {
    type: String,
    enum: ["public", "members", "subscribers"],
    default: "public"
  },

  status: {
    type: String,
    enum: ["open", "closed", "completed"],
    default: "open"
  },

  isDeleted: {
    type: Boolean,
    default: false
  },

  deletedAt: Date

}, { timestamps: true });

module.exports =
mongoose.model("CreatorHire", creatorHireSchema);