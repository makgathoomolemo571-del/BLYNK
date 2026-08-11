const mongoose = require("mongoose");

const socialSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  targetUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  relationshipType: {
    type: String,
    enum: [
      "friend",
      "follow",
      "subscriber",
      "blocked",
      "muted",
      "close_friend"
    ],
    required: true
  },

  status: {
    type: String,
    enum: [
      "pending",
      "accepted",
      "rejected"
    ],
    default: "accepted"
  },

  isDeleted: {
    type: Boolean,
    default: false
  },

  deletedAt: Date

},
{
  timestamps: true
});

module.exports =
mongoose.model(
  "Social",
  socialSchema
);