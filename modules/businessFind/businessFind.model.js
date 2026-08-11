const mongoose = require("mongoose");

const applicationSchema =
new mongoose.Schema({

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  sponsorships: [
  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sponsorship"
  }
  ],

  proposal: String,

  contentStrategy: String,

  deliverables: String,

  fixedFee: Number,

  revenueShare: Number,

  sponsorshipDetails: String,

  portfolio: [String],

  status: {
    type: String,
    enum: [
      "pending",
      "reviewed",
      "approved",
      "rejected"
    ],
    default: "pending"
  }

},{
  timestamps:true
});

const businessFindSchema =
new mongoose.Schema({

  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  businessName: String,

  industry: String,

  businessDescription: String,

  website: String,

  businessSize: String,

  talentType: String,

  campaignName: String,

  campaignObjectives: String,

  targetAudience: String,

  audienceLocation: String,

  requiredAudienceSize: Number,

  requiredEngagementRate: Number,

  campaignBudget: Number,

  compensationType: String,

  campaignStartDate: Date,

  campaignEndDate: Date,

  deliverables: String,

  platforms: [String],

  minimumFollowers: Number,

  contentCategories: [String],

  languageRequirements: [String],

  verificationRequired: Boolean,

  applications: [applicationSchema],

  status: {
    type: String,
    enum: [
      "open",
      "closed",
      "completed"
    ],
    default: "open"
  },

  visibility: {
    type: String,
    enum: [
      "public",
      "members",
      "subscribers"
    ],
    default: "public"
  },

  isDeleted: {
    type: Boolean,
    default: false
  },

  deletedAt: Date

},{
  timestamps:true
});

module.exports =
mongoose.model(
  "BusinessFind",
  businessFindSchema
);