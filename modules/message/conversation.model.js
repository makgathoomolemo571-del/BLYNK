// src/modules/messages/conversation.model.js

const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
{
  type: {
    type: String,
    enum: [
      "private",
      "group",
      "business",
      "creator",
      "marketplace",
      "creator_hire",
      "podcast",
      "watchparty"
    ],
    default: "private"
  },

  title: {
    type: String,
    trim: true
  },

  description: {
    type: String,
    default: ""
  },

  photo: {
    type: String,
    default: ""
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  admins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  },

  lastSender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  lastMessageText: {
    type: String,
    default: ""
  },

  lastMessageAt: {
    type: Date
  },

  unreadCounts: {
    type: Map,
    of: Number,
    default: {}
  },

  mutedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  archivedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  pinnedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  blockedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  visibility: {
    type: String,
    enum: [
      "public",
      "followers",
      "subscribers",
      "private"
    ],
    default: "private"
  },

  isLocked: {
    type: Boolean,
    default: false
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

conversationSchema.index({
  participants: 1
});

conversationSchema.index({
  lastMessageAt: -1
});

conversationSchema.index({
  owner: 1
});

module.exports =
mongoose.model(
  "Conversation",
  conversationSchema
);