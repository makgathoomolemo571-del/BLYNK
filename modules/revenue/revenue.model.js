const mongoose = require("mongoose");

const revenueSchema =
new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  source: {
    type: String,
    enum: [
      "subscription",
      "tip",
      "marketplace",
      "creatorHire",
      "businessFind",
      "sponsorship",
      "watchParty",
      "podcast"
    ],
    required: true
  },

  amount: {
    type: Number,
    required: true,
    min: 0
  },

  currency: {
    type: String,
    default: "ZAR"
  },

  status: {
    type: String,
    enum: [
      "pending",
      "paid",
      "cancelled"
    ],
    default: "pending"
  },

  referenceId: String,

  description: String,

  paidAt: Date,

  isDeleted: {
    type:Boolean,
    default:false
  },

  deletedAt: Date

},
{
  timestamps:true
});

module.exports =
mongoose.model(
  "Revenue",
  revenueSchema
);