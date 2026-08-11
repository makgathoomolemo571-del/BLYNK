const mongoose = require("mongoose");


const episodeSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  // Relationship
  podcast: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Podcast",
    required: true
  },

  // Display name
  podcastName: {
    type: String,
    required: true,
    trim: true
  },

  seasonNumber: Number,
  episodeNumber: Number,
  title: String,
  description: String,
  audio: String,
  video: String
});
const podcastSchema = new mongoose.Schema(
{
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  description: String,

  category: {
    type: String,
    default: "General"
  },

  coverImage: String,

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

  subscribers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

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

  status: {
    type: String,
    enum: [
      "draft",
      "active",
      "archived"
    ],
    default: "draft"
  },

  published: {
  type: Boolean,
  default: false
},

publishedAt: {
  type: Date,
  default: null
},

lastEpisodeAt: {
  type: Date,
  default: null
},

trailerEpisode: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Episode",
  default: null
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
  "Podcast",
  podcastSchema
);