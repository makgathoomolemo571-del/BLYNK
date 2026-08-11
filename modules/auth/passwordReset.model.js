const mongoose = require("mongoose");

const passwordResetSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    token: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    expiresAt: {
        type: Date,
        required: true,
        index: true
    },

    used: {
        type: Boolean,
        default: false
    },

    usedAt: {
        type: Date,
        default: null
    },

    ipAddress: String,

    userAgent: String,

    createdAt: {
        type: Date,
        default: Date.now
    }
});

passwordResetSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

module.exports = mongoose.model(
    "PasswordReset",
    passwordResetSchema
);