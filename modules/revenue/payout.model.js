// modules/revenue/payout.model.js

const mongoose = require("mongoose");

const payoutSchema = new mongoose.Schema(
{
  payoutId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
    required: true
  },

  monetization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Monetization",
    required: true
  },

  revenue: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Revenue"
  }],

  amount: {
    type: Number,
    required: true,
    min: 0
  },

  fee: {
    type: Number,
    default: 0
  },

  tax: {
    type: Number,
    default: 0
  },

  netAmount: {
    type: Number,
    required: true
  },

  currency: {
    type: String,
    default: "ZAR"
  },

  method: {
    type: String,
    enum: [
      "bank",
      "wallet"
    ],
    default: "bank"
  },

  bank: {

    bankName: String,

    accountHolder: String,

    accountNumber: String,

    branchCode: String,

    accountType: {
      type: String,
      enum: [
        "Savings",
        "Cheque",
        "Business"
      ]
    }

  },

  status: {
    type: String,
    enum: [
      "pending",
      "approved",
      "processing",
      "paid",
      "failed",
      "cancelled"
    ],
    default: "pending"
  },

  requestedAt: {
    type: Date,
    default: Date.now
  },

  approvedAt: Date,

  processingAt: Date,

  paidAt: Date,

  failureReason: String,

  paymentReference: String,

  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  metadata: {
    type: Object,
    default: {}
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

module.exports = mongoose.model(
  "Payout",
  payoutSchema
);