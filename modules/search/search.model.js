const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema(
  {

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    query: {
      type: String,
      required: true,
      index: true
    },

    type: {
      type: String,
      enum: [
        "users",
        "creators",
        "businesses",
        "posts",
        "reels",
        "stories",
        "podcasts",
        "episodes",
        "marketplace",
        "jobs",
        "venues",
        "all"
      ],
      default: "all"
    },

    resultsCount: {
      type: Number,
      default: 0
    },

    clickedResultId: {
      type: String
    },

    filters: {
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
mongoose.model(
  "SearchHistory",
  searchSchema
);