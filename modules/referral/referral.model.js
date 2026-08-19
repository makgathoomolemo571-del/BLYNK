const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema(
  {
    referrer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    referredUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true
    },

    status: {
      type: String,
      enum: [
        "pending",
        "completed",
        "expired"
      ],
      default: "pending"
    },

    referrerReward: {
      tokens: {
        type: Number,
        default: 1000
      },

      points: {
        type: Number,
        default: 10
      },

      rewardGiven: {
        type: Boolean,
        default: false
      },

      rewardedAt: Date
    },

    referredUserReward: {
      tokens: {
        type: Number,
        default: 500
      },

      points: {
        type: Number,
        default: 5
      },

      rewardGiven: {
        type: Boolean,
        default: false
      },

      rewardedAt: Date
    },

    rewardAmount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.model("Referral", referralSchema);