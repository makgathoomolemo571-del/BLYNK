const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    firstName:String,
    lastName:String,
    displayName:String,

    phone:String,

    country:String,
    province:String,
    city:String,

    dateOfBirth:Date,
    gender:String,

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:[
            "member",
            "creator",
            "business",
            "admin",
            "superadmin"
        ],
        default:"member"
    },

    status:{
        type:String,
        enum:[
            "active",
            "suspended",
            "banned"
        ],
        default:"active"
    },

    emailVerified:{
        type:Boolean,
        default:false
    },

    phoneVerified:{
        type:Boolean,
        default:false
    },

    verified:{
        type:Boolean,
        default:false
    },

    acceptTerms:Boolean,
    acceptPrivacy:Boolean,
    marketingConsent:Boolean,

    profile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    },

    wallet:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Wallet"
    },

    subscription:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subscription"
    },

    subscriptionPlan: {
    type: String,
    enum: [
        "FREE_MEMBER",
        "MEMBER_BASIC",
        "MEMBER_PLUS",
        "FREE_CREATOR",
        "CREATOR_BASIC",
        "CREATOR_PLUS",
        "CREATOR_PRO",
        "FREE_BUSINESS",
        "BUSINESS_BASIC",
        "BUSINESS_PRO",
        "BUSINESS_ENTERPRISE"
    ],
    default: "FREE_MEMBER"
},

    business:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Business"
    },

    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Creator"
    },

    permissions:{
        type:[String],
        default:[]
    },

    isDeleted:{
        type:Boolean,
        default:false
    },

    deletedAt:Date
},
{
    timestamps:true
});

module.exports = mongoose.model("User",userSchema);