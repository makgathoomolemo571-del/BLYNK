const mongoose = require("mongoose");

const deviceSessionSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    refreshToken: {
        type: String,
        required: true
    },

    deviceId: {
        type: String,
        required: true
    },

    deviceName: {
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

    platform: {
        type: String,
        default: ""
    },

    ipAddress: {
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
    },

    lastSeen: {
        type: Date,
        default: Date.now
    },

    expiresAt: {
        type: Date,
        required: true
    },

    active: {
        type: Boolean,
        default: true
    }

},
{
    timestamps: true
});

module.exports = mongoose.model(
    "DeviceSession",
    deviceSessionSchema
);