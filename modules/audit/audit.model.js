const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  action: {
    type: String,
    required: true
  },

  module: {
    type: String,
    required: true
  },

  metadata: {
    type: Object,
    default: {}
  },

  ip: String,

  userAgent: String,

  status: {
    type: String,
    enum: ["success", "failed"],
    default: "success"
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
mongoose.model("Audit", auditSchema);