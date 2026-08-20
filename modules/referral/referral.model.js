const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema(
  {
    // Existing BLYNK user who invited the new user
    referrer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    // New BLYNK user who registered using the referral
    referredUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true
    },

    // Referral number/code used during registration
    code: {
      type: String,
      required: true,
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

    // Existing member reward
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

    // New member reward
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

    // Total referral tokens
    rewardAmount: {
      type: Number,
      default: 1500
    },

    // Overall reward status
    rewardGiven: {
      type: Boolean,
      default: false
    },

    rewardedAt: Date
  },
  {
    timestamps: true
  }
);

// One referral per referred user
referralSchema.index(
  { referredUser: 1 },
  {
    unique: true,
    sparse: true
  }
);

module.exports =
  mongoose.model("Referral", referralSchema);