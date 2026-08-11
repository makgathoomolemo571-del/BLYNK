const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  emoji: {
    type: String,
    required: true
  }
},
{
  _id: false
}
);

const attachmentSchema = new mongoose.Schema(
{
  type: {
    type: String,
    enum: [
      "image",
      "video",
      "audio",
      "voice",
      "document",
      "gif",
      "sticker",
      "location"
    ],
    required: true
  },

  url: {
    type: String,
    required: true
  },

  thumbnail: String,

  fileName: String,

  mimeType: String,

  size: Number,

  duration: Number,

  width: Number,

  height: Number
},
{
  _id: false
}
);

const messageSchema = new mongoose.Schema(
{
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
    index: true
  },

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  text: {
    type: String,
    trim: true,
    default: ""
  },

  attachments: [attachmentSchema],

  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  },

  forwardedFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  },

  mentions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  reactions: [reactionSchema],

  deliveredTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  readBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  deletedFor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],

  edited: {
    type: Boolean,
    default: false
  },

  editedAt: Date,

  deletedForEveryone: {
    type: Boolean,
    default: false
  },

  isDeleted: {
    type: Boolean,
    default: false
  },

  createdAtServer: {
    type: Date,
    default: Date.now
  }
},
{
  timestamps: true
}
);

messageSchema.index({
  conversation: 1,
  createdAt: -1
});

messageSchema.index({
  sender: 1,
  createdAt: -1
});

module.exports = mongoose.model(
  "Message",
  messageSchema
);