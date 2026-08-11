const mongoose = require("mongoose");

const creatorStudioSchema = new mongoose.Schema({

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: String,

  description: String,

  status: {
    type: String,
    enum: ["draft", "scheduled", "published", "failed"],
    default: "draft"
  },

  contentType: {
    type: String,
    enum: ["post", "reel", "podcast", "episode"],
    required: true
  },

  media: [String],

  scheduledAt: Date,

  publishedAt: Date,

  engagement: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 }
  },

  isDeleted: { type: Boolean, default: false },
  deletedAt: Date

}, { timestamps: true });

module.exports = mongoose.model("CreatorStudio", creatorStudioSchema);