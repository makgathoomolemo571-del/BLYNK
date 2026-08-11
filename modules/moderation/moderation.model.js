const mongoose = require("mongoose");

const moderationSchema =
new mongoose.Schema({

  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  targetType: {
    type: String,
    enum: [
      "user",
      "post",
      "reel",
      "story",
      "podcast",
      "episode",
      "comment",
      "message",
      "marketplace",
      "creatorHire",
      "businessFind"
    ],
    required: true
  },

  targetId: {
    type: String,
    required: true
  },

  reason: {
    type: String,
    enum: [
      "spam",
      "harassment",
      "hate_speech",
      "fake_account",
      "copyright",
      "scam",
      "nudity",
      "violence",
      "misinformation",
      "other"
    ],
    required: true
  },

  description: String,

  status: {
    type: String,
    enum: [
      "pending",
      "under_review",
      "approved",
      "rejected",
      "resolved"
    ],
    default: "pending"
  },

  severity: {
    type: String,
    enum: [
      "low",
      "medium",
      "high",
      "critical"
    ],
    default: "medium"
  },

  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  reviewedAt: Date,

  resolutionNotes: String,

  actionTaken: {
    type: String,
    enum: [
      "none",
      "warning",
      "remove_content",
      "suspend_user",
      "ban_user"
    ],
    default: "none"
  },

  isDeleted: {
    type: Boolean,
    default: false
  }

},
{
  timestamps:true
});

module.exports =
mongoose.model(
  "Moderation",
  moderationSchema
);