const mongoose = require("mongoose");

const applicationSchema =
new mongoose.Schema(
{
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  message: String,

  proposedPrice: Number,

  status: {
    type: String,
    enum: [
      "pending",
      "accepted",
      "rejected"
    ],
    default: "pending"
  }
},
{
  timestamps:true
}
);

const marketplaceSchema =
new mongoose.Schema(
{
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  sellerName: String,
sellerType: {
  type: String,
  enum: ["creator", "business"],
},
phone: String,
whatsapp: String,
email: String,

  listingType: {
    type:String,
    enum:[
      "creator_service",
      "business_opportunity",
      "sponsorship",
      "collaboration",
      "freelance_service",
      "event_opportunity"
    ],
    required:true
  },

  title: {
    type:String,
    required:true
  },

  category:String,

  description:String,

  price:Number,

  budgetRange:String,

  location:String,

  visibility:{
    type:String,
    enum:[
      "public",
      "members",
      "subscribers"
    ],
    default:"public"
  },

  applications:[applicationSchema],

  isDeleted:{
    type:Boolean,
    default:false
  },

  deletedAt:Date
},
{
  timestamps:true
}
);

module.exports =
mongoose.model(
  "Marketplace",
  marketplaceSchema
);