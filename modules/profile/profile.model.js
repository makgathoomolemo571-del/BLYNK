const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

firstName: {
  type: String,
  default: ""
},

lastName: {
  type: String,
  default: ""
},

displayName: {
  type: String,
  default: ""
},

bio: {
  type: String,
  default: ""
},

profilePicture: {
  type: String,
  default: ""
},

coverBanner: {
  type: String,
  default: ""
},

website: {
  type: String,
  default: ""
},

location: {
  city: {
    type: String,
    default: ""
  },
  province: {
    type: String,
    default: ""
  },
  country: {
    type: String,
    default: ""
  }
},

  dateOfBirth: Date,
  gender: String,

 

  socials: {
    instagram: String,
    tiktok: String,
    youtube: String,
    facebook: String,
    linkedin: String,
    x: String
  },

  visibility: {
    profile: {
      type: String,
      enum: [
        "public",
        "followers"
      ],
      default: "public"
    },

    showEmail: {
      type: Boolean,
      default: false
    },

    showPhone: {
      type: Boolean,
      default: false
    }
  },

  isDeleted: {
    type: Boolean,
    default: false
  },

  deletedAt: Date,
  deletedBy: mongoose.Schema.Types.ObjectId

},
{
  timestamps: true
}
);

module.exports =
mongoose.model(
  "Profile",
  profileSchema
);