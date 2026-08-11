const mongoose = require("mongoose");

const notificationSchema =
new mongoose.Schema(
{
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
    index: true
  },

  actor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  type: {
    type: String,
    required: true
  },

  title: String,

  message: String,

  entityType: {
    type: String
  },

  entityId: {
    type: mongoose.Schema.Types.ObjectId
  },

  read: {
    type: Boolean,
    default: false
  },

  delivered: {
    type: Boolean,
    default: false
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
  "Notification",
  notificationSchema
);