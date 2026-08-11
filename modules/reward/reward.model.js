const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  type: {
    type: String,
    enum: [
      // "VIG_POINTS",
      "TOKENS",
      "VOUCHER"
    ],
    required: true
  },

  source: {
    type: String,
    enum: [
      "POST",
      "REEL",
      "STORY",
      "PODCAST",
      "REFERRAL",
      "WATCH_PARTY",
      "MARKETPLACE",
      "DAILY_LOGIN",
      "ADMIN"
    ],
    required: true
  },

  amount: {
    type: Number,
    default: 0
  },

  metadata: {
    type: Object,
    default: {}
  },

  isRedeemed: {
    type: Boolean,
    default: false
  },

  redeemedAt: Date

}, {
  timestamps: true
});

module.exports = mongoose.model("Reward", rewardSchema);