const mongoose = require("mongoose");

const verificationSchema =
new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  type: {
    type: String,
    enum: [
      "identity",
      "creator",
      "business",
      "venue",
      "podcast"
    ],
    required: true
  },

  fullName: String,

  idNumber: String,

  registrationNumber: String,

  taxNumber: String,

  website: String,

  socialLinks: [{
    platform: String,
    url: String
  }],

  documents: [{
    mediaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media"
    }
  }],

  status: {
    type: String,
    enum: [
      "submitted",
      "under_review",
      "approved",
      "rejected"
    ],
    default: "submitted"
  },

  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  reviewedAt: Date,

  rejectionReason: String,

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
  "Verification",
  verificationSchema
);