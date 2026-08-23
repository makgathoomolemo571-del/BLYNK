const User = require("../user/user.model");

const rewardEngine = {

    // =====================================================
    // ADD BLYNK POINTS
    // =====================================================

    async addBlynkPoints(
        userId,
        points,
        reason = "activity"
    ) {

        const user =
            await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        user.blynkPoints =
            (user.blynkPoints || 0) + points;

        if (!Array.isArray(user.blynkRewardHistory)) {
            user.blynkRewardHistory = [];
        }

        user.blynkRewardHistory.push({

            points,

            reason,

            date: new Date()

        });

        await user.save();

        return user.blynkPoints;
    },


    // =====================================================
    // REDEEM BLYNK POINTS
    // =====================================================

    async redeem(
        userId,
        points
    ) {

        const user =
            await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        if (
            (user.blynkPoints || 0) <
            points
        ) {

            throw new Error(
                "Insufficient BLYNK points"
            );
        }

        user.blynkPoints -= points;

        await user.save();

        return user.blynkPoints;
    },


    // =====================================================
    // BLYNK POINT STATS
    // =====================================================

    async stats(userId) {

        const user =
            await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        return {

            blynkPoints:
                user.blynkPoints || 0,

            history:
                user.blynkRewardHistory || []

        };
    }

};


module.exports =
    rewardEngine;