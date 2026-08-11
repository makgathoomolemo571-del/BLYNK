// src/modules/messages/attachment.model.js

const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema(
  {
    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      required: true,
      index: true
    },

    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    type: {
      type: String,
      enum: [
        "image",
        "video",
        "audio",
        "voice",
        "document",
        "pdf",
        "spreadsheet",
        "presentation",
        "archive",
        "text",
        "gif",
        "sticker",
        "location",
        "contact",
        "other"
      ],
      required: true
    },

    fileName: {
      type: String,
      required: true,
      trim: true
    },

    originalName: {
      type: String,
      trim: true
    },

    mimeType: {
      type: String,
      required: true
    },

    extension: {
      type: String,
      default: ""
    },

    url: {
      type: String,
      required: true
    },

    thumbnail: {
      type: String,
      default: ""
    },

    size: {
      type: Number,
      default: 0
    },

    duration: {
      type: Number,
      default: 0
    },

    width: {
      type: Number,
      default: 0
    },

    height: {
      type: Number,
      default: 0
    },

    downloaded: {
      type: Number,
      default: 0
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },

    isDeleted: {
      type: Boolean,
      default: false
    },

    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

attachmentSchema.index({
  message: 1,
  createdAt: -1
});

attachmentSchema.index({
  uploader: 1,
  createdAt: -1
});

module.exports = mongoose.model(
  "Attachment",
  attachmentSchema
);