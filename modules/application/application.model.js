const mongoose = require("mongoose");

const applicationSchema =
new mongoose.Schema({

  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  targetType: {
    type: String,
    enum: [
      "CREATOR_HIRE",
      "BUSINESS_FIND",
      "SPONSORSHIP"
    ],
    required: true
  },

  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },

  message: String,

  proposal: String,

  deliverables: String,

  proposedPrice: Number,

  portfolioLinks: [String],

  attachments: [String],

  status: {
    type: String,
    enum: [
      "pending",
      "reviewed",
      "accepted",
      "rejected",
      "withdrawn"
    ],
    default: "pending"
  },

  isDeleted: {
    type: Boolean,
    default: false
  },

  deletedAt: Date

},
{
  timestamps:true
});

module.exports =
mongoose.model(
  "Application",
  applicationSchema
);