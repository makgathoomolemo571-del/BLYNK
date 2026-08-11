const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  type: {
    type: String,
    enum: [
      "TOKEN_PURCHASE",
      "VIG_REWARD",
      "VOUCHER_REDEMPTION",
      "MARKETPLACE_PAYMENT",
      "SUBSCRIPTION_PAYMENT"
    ],
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  currency: {
    type: String,
    enum: ["TOKENS", "VIG_POINTS", "VOUCHER"],
    default: "TOKENS"
  },

  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "completed"
  },

  reference: {
    type: String,
    unique: true
  },

  metadata: {
    type: Object,
    default: {}
  },

  isDeleted: {
    type: Boolean,
    default: false
  }

},
{
  timestamps: true
}
);

module.exports =
mongoose.model("Payment", paymentSchema);