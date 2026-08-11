const mongoose = require("mongoose");

const episodeSchema = new mongoose.Schema(
{
  podcast: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Podcast",
    required: true
  },
podcastName: {
  type: String,
  required: true,
  trim: true
},
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  seasonNumber: {
    type: Number,
    default: 1
  },

  episodeNumber: {
    type: Number,
    required: true
  },

  totalEpisodes: {
    type: Number,
    default: 0
},

totalViews: {
    type: Number,
    default: 0
},

totalListeners: {
    type: Number,
    default: 0
},

lastEpisodeAt: Date,

  title: {
    type: String,
    required: true
  },

  description: String,

  audio: String,

  video: String,

  duration: {
    type: Number,
    default: 0
  },

  plays: {
    type: Number,
    default: 0
  },

  views: {
    type: Number,
    default: 0
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  shares: {
    type: Number,
    default: 0
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

  publishDate: Date,

  status: {
    type: String,
    enum: [
      "draft",
      "scheduled",
      "published"
    ],
    default: "draft"
  },

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
  "Episode",
  episodeSchema
);