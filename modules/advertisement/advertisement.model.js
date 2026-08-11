const mongoose = require("mongoose");

const advertisementSchema = new mongoose.Schema({

  advertiser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: String,

  media: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: ["image", "video", "carousel"],
    default: "image"
  },

  targetAudience: {

    ageMin: Number,
    ageMax: Number,

    countries: [String],

    interests: [String],

    gender: String

  },

  budget: {
    type: Number,
    required: true
  },

  spent: {
    type: Number,
    default: 0
  },

  impressions: {
    type: Number,
    default: 0
  },

  clicks: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: ["active", "paused", "completed"],
    default: "active"
  },

  isDeleted: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports =
mongoose.model("Advertisement", advertisementSchema);