const mongoose = require("mongoose");

const reelShareSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    reel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reel",
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model(
    "ReelShare",
    reelShareSchema
);