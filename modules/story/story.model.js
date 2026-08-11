const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
{
    url: String,

    type: {
        type: String,
        enum: ["image","video","audio","document"]
    },

    thumbnail: String
},
{ _id:false }
);

const reactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: {
      type: String,
      enum: ["like", "love", "fire", "laugh", "wow"]
    }
  },
  { _id: false }
);

const replySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const storySchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true
    },


    caption: String,

    type: {
      type: String,
      enum: ["text", "image", "video", "link", "reel-share"],
      default: "text"
    },

    views: { type: Number, default: 0 },

    viewers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],

    reactions: [reactionSchema],

    replies: [replySchema],

    visibility: {
      type: String,
      enum: ["public", "followers", "subscribers"],
      default: "public"
    },

    expiresAt: {
      type: Date,
      required: true
    },

    isDeleted: { type: Boolean, default: false },
    deletedAt: Date,
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", storySchema);