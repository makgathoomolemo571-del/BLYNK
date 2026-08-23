const User = require("../user/user.model");

const rewardEngine = {

    // =====================================================
    // ADD BLYNK TOKENS
    // =====================================================

    async addTokens(
        userId,
        tokens,
        reason = "activity"
    ) {

        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        if (!Number.isFinite(tokens) || tokens <= 0) {
            throw new Error("Invalid token amount");
        }

        user.blynkTokens =
            (user.blynkTokens || 0) + tokens;

        if (!Array.isArray(user.blynkRewardHistory)) {
            user.blynkRewardHistory = [];
        }

        user.blynkRewardHistory.push({

            type: "TOKENS",

            amount: tokens,

            reason,

            date: new Date()

        });

        await user.save();

        return user.blynkTokens;
    },


    // =====================================================
    // ADD BLYNK POINTS
    // =====================================================

    async addPoints(
        userId,
        points,
        reason = "activity"
    ) {

        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        if (!Number.isFinite(points) || points <= 0) {
            throw new Error("Invalid points amount");
        }

        user.blynkPoints =
            (user.blynkPoints || 0) + points;

        if (!Array.isArray(user.blynkRewardHistory)) {
            user.blynkRewardHistory = [];
        }

        user.blynkRewardHistory.push({

            type: "POINTS",

            amount: points,

            reason,

            date: new Date()

        });

        await user.save();

        return user.blynkPoints;
    },


    // =====================================================
    // CONVERT TOKENS → POINTS
    // =====================================================

    async convertTokensToPoints(
        userId,
        tokens
    ) {

        const TOKENS_PER_POINT = 100;

        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        if (!Number.isFinite(tokens) || tokens <= 0) {
            throw new Error("Invalid token amount");
        }

        if ((user.blynkTokens || 0) < tokens) {
            throw new Error("Insufficient BLYNK tokens");
        }

        const points = Math.floor(
            tokens / TOKENS_PER_POINT
        );

        if (points <= 0) {
            throw new Error(
                "Minimum 100 BLYNK tokens required"
            );
        }

        const tokensUsed =
            points * TOKENS_PER_POINT;

        user.blynkTokens -= tokensUsed;

        user.blynkPoints =
            (user.blynkPoints || 0) + points;

        if (!Array.isArray(user.blynkRewardHistory)) {
            user.blynkRewardHistory = [];
        }

        user.blynkRewardHistory.push({

            type: "TOKEN_TO_POINTS",

            tokens: tokensUsed,

            points,

            reason: "token_conversion",

            date: new Date()

        });

        await user.save();

        return {

            tokensUsed,

            points,

            remainingTokens:
                user.blynkTokens,

            totalPoints:
                user.blynkPoints

        };
    },


    // =====================================================
    // REDEEM BLYNK POINTS
    // =====================================================

    async redeemPoints(
        userId,
        points
    ) {

        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        if (
            !Number.isFinite(points) ||
            points <= 0
        ) {
            throw new Error("Invalid points amount");
        }

        if (
            (user.blynkPoints || 0) < points
        ) {
            throw new Error(
                "Insufficient BLYNK points"
            );
        }

        user.blynkPoints -= points;

        if (!Array.isArray(user.blynkRewardHistory)) {
            user.blynkRewardHistory = [];
        }

        user.blynkRewardHistory.push({

            type: "POINTS_REDEEMED",

            amount: points,

            reason: "voucher_redemption",

            date: new Date()

        });

        await user.save();

        return user.blynkPoints;
    },


    // =====================================================
    // GET REWARD STATS
    // =====================================================

    async stats(userId) {

        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        return {

            blynkTokens:
                user.blynkTokens || 0,

            blynkPoints:
                user.blynkPoints || 0,

            history:
                user.blynkRewardHistory || []

        };

    }

};

module.exports = rewardEngine;