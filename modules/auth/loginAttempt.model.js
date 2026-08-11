const mongoose = require("mongoose");

const loginAttemptSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    success: {
        type: Boolean,
        required: true
    },

    reason: {
        type: String,
        enum: [
            "SUCCESS",
            "INVALID_PASSWORD",
            "ACCOUNT_NOT_FOUND",
            "ACCOUNT_LOCKED",
            "ACCOUNT_SUSPENDED",
            "ACCOUNT_BANNED",
            "EMAIL_NOT_VERIFIED",
            "OTP_REQUIRED",
            "OTP_FAILED",
            "TOKEN_EXPIRED",
            "UNKNOWN"
        ],
        default: "UNKNOWN"
    },

    ipAddress: {
        type: String,
        default: ""
    },

    userAgent: {
        type: String,
        default: ""
    },

    browser: {
        type: String,
        default: ""
    },

    operatingSystem: {
        type: String,
        default: ""
    },

    device: {
        type: String,
        default: ""
    },

    country: {
        type: String,
        default: ""
    },

    province: {
        type: String,
        default: ""
    },

    city: {
        type: String,
        default: ""
    }

},
{
    timestamps: true
});

module.exports = mongoose.model(
    "LoginAttempt",
    loginAttemptSchema
);