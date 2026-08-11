const mongoose = require("mongoose");

const supportSchema =
new mongoose.Schema({

  ticketNumber: {
    type:String,
    unique:true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  subject: {
    type:String,
    required:true
  },

  issueType: {
    type:String,
    enum:[
      "technical",
      "account",
      "login",
      "subscription",
      "payment",
      "creator",
      "business",
      "marketplace",
      "wallet",
      "verification",
      "security",
      "other"
    ],
    required:true
  },

  description: {
    type:String,
    required:true
  },

  affectedFeature: {
    type:String
  },

  priority: {
    type:String,
    enum:[
      "low",
      "medium",
      "high",
      "urgent"
    ],
    default:"medium"
  },

  status: {
    type:String,
    enum:[
      "open",
      "in_progress",
      "awaiting_user",
      "resolved",
      "closed"
    ],
    default:"open"
  },

  assignedAgent:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  resolutionNotes:String,

  attachments:[{
    mediaId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Media"
    }
  }],

  isDeleted:{
    type:Boolean,
    default:false
  }

},
{
  timestamps:true
});

module.exports =
mongoose.model(
  "Support",
  supportSchema
);