const mongoose = require("mongoose");

const draftSchema = new mongoose.Schema({

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  contentType: {
    type: String,
    enum: ["post", "reel", "podcast", "episode"]
  },

  data: Object,

  autoSave: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("CreatorDraft", draftSchema);