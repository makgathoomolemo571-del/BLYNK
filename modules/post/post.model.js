const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  type: {
    type: String,
    enum: ["like", "love", "fire", "laugh", "wow"],
    default: "like"
  }

},
{ _id: false }
);

const replySchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

   likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  text: {
    type: String,
    required: true,
    maxlength: 1000
  }
},
{ timestamps: true }
);

const commentSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  text: {
    type: String,
    required: true,
    maxlength: 1000
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  replies: [replySchema]

},
{ timestamps: true }
);

const mediaSchema = new mongoose.Schema(
{
  url: String,

  type: {
    type: String,
    enum: [
      "image",
      "video",
      "audio",
      "document"
    ]
  },

  thumbnail: String
},
{ _id: false }
);

const postSchema = new mongoose.Schema(
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

  media: [mediaSchema],

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

  sharedPost:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post"
},

shareCaption:String,

  views: {
    type: Number,
    default: 0
  },

  reports: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    reason: String
  }],

  status: {
    type: String,
    enum: [
      "active",
      "hidden",
      "removed"
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
  "Post",
  postSchema
);