const mongoose = require("mongoose");

const transactionSchema =
new mongoose.Schema(
{

transactionId: {
  type: String,
  required: true,
  unique: true
},

  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  type: {
    type: String,
    enum: [
      "credit",
      "debit",
      "deposit",
      "withdrawal",
      "refund",
      "commission",
      "tip",
      "subscription",
      "marketplace",
      "creator_hire",
      "business_payment"
    ],
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  currency: {
    type: String,
    default: "ZAR"
  },

  status: {
    type: String,
    enum: [
      "pending",
      "completed",
      "failed",
      "cancelled"
    ],
    default: "completed"
  },

  reference: String,

  description: String,

  metadata: {
    type: Object,
    default: {}
  }

},
{
  timestamps: true
}
);

module.exports =
mongoose.model(
  "Transaction",
  transactionSchema
);