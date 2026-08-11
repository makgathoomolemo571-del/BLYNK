const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema({

  referrer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  referredUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  code: {
    type: String,
    required: true,
    unique: true
  },

  status: {
    type: String,
    enum: ["pending", "completed", "expired"],
    default: "pending"
  },

  rewardGiven: {
    type: Boolean,
    default: false
  },

  rewardAmount: {
    type: Number,
    default: 0
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Referral", referralSchema);