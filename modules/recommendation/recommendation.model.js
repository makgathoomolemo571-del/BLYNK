const mongoose = require("mongoose");

const recommendationSchema =
new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  type: {
    type: String,
    enum: [
      "creator",
      "business",
      "post",
      "reel",
      "story",
      "podcast",
      "marketplace",
      "creatorHire",
      "businessFind",
      "venue"
    ],
    required: true
  },

  targetId: {
    type: String,
    required: true
  },

  score: {
    type: Number,
    default: 0
  },

  reason: {
    type: String
  }

},
{
  timestamps:true
});

module.exports =
mongoose.model(
  "Recommendation",
  recommendationSchema
);