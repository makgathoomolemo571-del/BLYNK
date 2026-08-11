const mongoose = require("mongoose");

const monetizationSchema = new mongoose.Schema(
{
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
    index: true
  },

  status: {
    type: String,
    enum: [
      "pending",
      "under_review",
      "approved",
      "rejected",
      "suspended"
    ],
    default: "pending"
  },

  eligibility: {

    followers: {
      type: Boolean,
      default: false
    },

    views: {
      type: Boolean,
      default: false
    },

    content: {
      type: Boolean,
      default: false
    },

    kyc: {
      type: Boolean,
      default: false
    },

    bank: {
      type: Boolean,
      default: false
    },

    tax: {
      type: Boolean,
      default: false
    }

  },

  revenueStreams: {

    ads: {
      type: Boolean,
      default: false
    },

    subscriptions: {
      type: Boolean,
      default: false
    },

    tips: {
      type: Boolean,
      default: false
    },

    stars: {
      type: Boolean,
      default: false
    },

    gifts: {
      type: Boolean,
      default: false
    },

    podcast: {
      type: Boolean,
      default: false
    },

    marketplace: {
      type: Boolean,
      default: false
    },

    affiliate: {
      type: Boolean,
      default: false
    },

    sponsorships: {
      type: Boolean,
      default: false
    },

    creatorHire: {
      type: Boolean,
      default: false
    },

    watchParty: {
      type: Boolean,
      default: false
    }

  },

  earnings: {

    lifetime: {
      type: Number,
      default: 0
    },

    thisMonth: {
      type: Number,
      default: 0
    },

    today: {
      type: Number,
      default: 0
    },

    pending: {
      type: Number,
      default: 0
    },

    available: {
      type: Number,
      default: 0
    },

    processing: {
      type: Number,
      default: 0
    },

    withdrawn: {
      type: Number,
      default: 0
    }

  },

  payoutSettings: {

    minimumWithdrawal: {
      type: Number,
      default: 100
    },

    currency: {
      type: String,
      default: "ZAR"
    },

    autoPayout: {
      type: Boolean,
      default: false
    }

  },

  payoutMethod: {

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

  analytics: {

    totalViews: {
      type: Number,
      default: 0
    },

    totalWatchTime: {
      type: Number,
      default: 0
    },

    subscribers: {
      type: Number,
      default: 0
    },

    followers: {
      type: Number,
      default: 0
    }

  },

  lastPayout: Date,

  lastRevenueCalculation: Date

},
{
  timestamps: true
}
);

module.exports = mongoose.model(
  "Monetization",
  monetizationSchema
);