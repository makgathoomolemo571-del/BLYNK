const mongoose = require("mongoose");

const reactionSchema =
new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

 

  type: {
    type: String,
    enum: [
      "like",
      "love",
      "fire",
      "laugh",
      "wow"
    ],
    default: "like"
  }

},
{
  _id: false
}
);

const replySchema =
new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  text: {
    type: String,
    maxlength: 1000
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

},
{
  _id: false
}
);

const commentSchema =
new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  text: {
    type: String,
    maxlength: 1000
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  replies: [replySchema]

},
{
  timestamps: true
}
);

const reelSchema =
new mongoose.Schema(
{
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  caption: {
    type: String,
    maxlength: 2200
  },

  video: {
    url: String,
    thumbnail: String,
    duration: Number,
    size: Number
  },


  hashtags: [String],

  mentions: [String],

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

  reactions: [reactionSchema],

  comments: [commentSchema],

  saves: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  shares: {
    type: Number,
    default: 0
  },

  views: {
    type: Number,
    default: 0
  },

  uniqueViews: {
    type: Number,
    default: 0
  },

  watchTime: {
    type: Number,
    default: 0
  },

  completionRate: {
    type: Number,
    default: 0
  },

  reports: {
    type: Number,
    default: 0
  },

  status: {
    type: String,
    enum: [
      "active",
      "processing",
      "blocked"
    ],
    default: "active"
  },

  isDeleted: {
    type: Boolean,
    default: false
  },

  deletedAt: Date,

  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

},
{
  timestamps: true
}
);

module.exports =
mongoose.model(
  "Reel",
  reelSchema
);