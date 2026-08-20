const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema(
{
    referrer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    referredUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    code: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
        index: true
    },

    status: {
        type: String,
        enum: [
            "pending",
            "completed",
            "expired"
        ],
        default: "completed"
    },

    referrerReward: {
        tokens: {
            type: Number,
            default: 1000
        },

        points: {
            type: Number,
            default: 10
        },

        rewardGiven: {
            type: Boolean,
            default: false
        },

        rewardedAt: Date
    },

    referredUserReward: {
        tokens: {
            type: Number,
            default: 500
        },

        points: {
            type: Number,
            default: 5
        },

        rewardGiven: {
            type: Boolean,
            default: false
        },

        rewardedAt: Date
    },

    rewardAmount: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
}
);

referralSchema.index(
    {
        referrer: 1,
        referredUser: 1
    },
    {
        unique: true
    }
);

module.exports =
    mongoose.model(
        "Referral",
        referralSchema
    );