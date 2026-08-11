// modules/sponsorship/sponsorship.model.js

const mongoose = require("mongoose");

const sponsorshipSchema = new mongoose.Schema(
{
  sponsorshipId: {
  type: String,
  unique: true,
  index: true,
  default: () =>
    `SPO-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
},


  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  creator: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null,
  index: true
},

  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign"
  },

  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    default: ""
  },

  category: {
    type: String,
    enum: [
      "video",
      "post",
      "story",
      "reel",
      "live",
      "podcast",
      "watchparty",
      "event",
      "brand_ambassador",
      "other"
    ],
    default: "post"
  },

 budget: {
  type: Number,
  default: 0,
  min: 0
},


  creatorAmount: {
    type: Number,
    default: 0
  },

  platformCommission: {
    type: Number,
    default: 0
  },

  vat: {
    type: Number,
    default: 0
  },

  currency: {
    type: String,
    default: "ZAR"
  },

  paymentType: {
    type: String,
    enum: [
      "once",
      "milestone",
      "monthly"
    ],
    default: "once"
  },

  status: {
  type: String,
  enum: [
    "draft",
    "requested",
    "negotiating",
    "accepted",
    "declined",
    "active",
    "submitted",
    "approved",
    "completed",
    "cancelled",
    "disputed"
  ],
  default: "requested",
  lowercase: true,
  trim: true
},

  deliverables: [{
  type: String,
  trim: true
}],

  hashtags: [String],

  mentions: [String],

  attachments: [{
    url: String,
    type: String,
    filename: String
  }],

  submission: {
    contentUrl: String,
    caption: String,
    submittedAt: Date
  },

  analytics: {
    impressions: {
      type: Number,
      default: 0
    },
    reach: {
      type: Number,
      default: 0
    },
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    },
    clicks: {
      type: Number,
      default: 0
    },
    engagementRate: {
      type: Number,
      default: 0
    }
  },

  payment: {

    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction"
    },

    revenue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Revenue"
    },

    payout: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payout"
    },

    escrowHeld: {
      type: Boolean,
      default: false
    },

    paid: {
      type: Boolean,
      default: false
    },

    paidAt: Date
  },

  contractAccepted: {
    business: {
      type: Boolean,
      default: false
    },
    creator: {
      type: Boolean,
      default: false
    }
  },

  startDate: {
  type: Date,
  default: null
},

endDate: {
  type: Date,
  default: null
},

 notes: {
  type: String,
  default: ""
},

cancellationReason: {
  type: String,
  default: ""
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
  "Sponsorship",
  sponsorshipSchema
);