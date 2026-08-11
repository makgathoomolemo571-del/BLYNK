const mongoose = require("mongoose");
const crypto = require("crypto");

const watchPartySchema =
new mongoose.Schema(
{
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  roomCode: {
  type: String,
  unique: true,
  required: true,
  default: () => crypto.randomBytes(4).toString("hex").toUpperCase()
},

  title: {
    type: String,
    required: true
  },

  description: String,

  type: {
    type: String,
    enum: [
      "creator_live",
      "business_live",
      "venue_live",
      "watch_party"
    ],
    default: "watch_party"
  },

  thumbnail: String,

  streamKey: String,

  status: {
    type: String,
    enum: [
      "scheduled",
      "live",
      "ended"
    ],
    default: "scheduled"
  },

  visibility: {
    type: String,
    enum: [
      "public",
      "followers",
      "subscribers",
      "private"
    ],
    default: "public"
  },

  viewerCount: {
    type: Number,
    default: 0
  },

  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  startedAt: Date,

  endedAt: Date,

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
  "WatchParty",
  watchPartySchema
);