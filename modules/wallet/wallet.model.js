const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
    index: true
  },

  balance: {
    type: Number,
    default: 0
  },

  currency: {
    type: String,
    default: "ZAR"
  },

  status: {
    type: String,
    enum: [
      "active",
      "frozen",
      "suspended",
      "closed"
    ],
    default: "active"
  },

  totalDeposits: {
    type: Number,
    default: 0
  },

  totalWithdrawals: {
    type: Number,
    default: 0
  },

  totalRevenue: {
    type: Number,
    default: 0
  },

  lastTransactionAt: Date,

  isDeleted: {
    type: Boolean,
    default: false
  },

  deletedAt: Date

},
{
  timestamps: true
}
);

module.exports =
mongoose.model(
  "Wallet",
  walletSchema
);