const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
      unique: true // 🔥 FIX: prevents duplicate subscriptions per user
    },

    plan: {
      type: String,
      enum: [
        "FREE_MEMBER",
        "FREE_CREATOR",
        "FREE_BUSINESS",

        "MEMBER_BASIC",
        "MEMBER_PLUS",
        "MEMBER_VIP",

        "CREATOR_BASIC",
        "CREATOR_PLUS",
        "CREATOR_PRO",

        "BUSINESS_BASIC",
        "BUSINESS_PRO",
        "BUSINESS_ENTERPRISE"
      ],
      default: "FREE_MEMBER",
      index: true
    },

    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
      index: true
    },

    startDate: {
      type: Date,
      default: Date.now // 🔥 FIX: ensures always set
    },

    endDate: {
      type: Date,
      default: null
    },

    autoRenew: {
      type: Boolean,
      default: true
    },

    // 🔥 FIX 2: required for billing logic later
    lastPaymentDate: {
      type: Date,
      default: null
    },

    nextBillingDate: {
      type: Date,
      default: null
    },

    // 🔥 FIX 3: soft delete (you already requested this in architecture)
    isDeleted: {
      type: Boolean,
      default: false,
      index: true
    },

    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// 🔥 FIX 4: prevent duplicate active subscriptions (critical safety rule)
subscriptionSchema.index(
  { user: 1, status: 1 },
  { unique: true, partialFilterExpression: { status: "active" } }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);