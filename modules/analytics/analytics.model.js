const mongoose = require("mongoose");

const analyticsSchema =
new mongoose.Schema({

  eventType: {
    type: String,
    required: true
  },

  actor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  targetId: {
    type: mongoose.Schema.Types.ObjectId
  },

  targetType: {
    type: String
  },

  metadata: {
    type: Object,
    default: {}
  }

},
{
  timestamps:true
});

module.exports =
mongoose.model(
  "Analytics",
  analyticsSchema
);