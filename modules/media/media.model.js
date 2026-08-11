const mongoose = require("mongoose");

const mediaSchema =
new mongoose.Schema({

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  type: {
    type: String,
    enum: [
      "image",
      "video",
      "audio",
      "document",
      "thumbnail"
    ],
    required: true
  },

  module: {
    type: String,
    enum: [
      "profile",
      "post",
      "reel",
      "story",
      "podcast",
      "episode",
      "watchparty",
      "marketplace",
      "creatorHire",
      "businessFind",
      "verification",
      "venue",
      "booking",
      "support"
    ],
    required: true
  },

  url: String,

  publicId: String,

  originalName: String,

  mimeType: String,

  size: Number,

  width: Number,

  height: Number,

  duration: Number,

  thumbnail: String,

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
  "Media",
  mediaSchema
);