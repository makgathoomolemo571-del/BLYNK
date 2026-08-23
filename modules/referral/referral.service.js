const crypto = require("crypto");

const User = require("../user/user.model");
const Referral = require("./referral.model");

const events = require("./referral.events");
const eventBus = require("../../shared/eventBus");
const mapper = require("./referral.mapper");

module.exports = {

    // =====================================================
    // GENERATE UNIQUE REFERRAL NUMBER FOR A USER
    // =====================================================

    async createUserReferralCode(userId) {

        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        // Already has one
        if (user.referralCode) {
            return user.referralCode;
        }

        let code;
        let exists = true;

        while (exists) {

            code =
                "BLYNK-" +
                crypto
                    .randomBytes(4)
                    .toString("hex")
                    .toUpperCase();

            exists = await User.exists({
                referralCode: code
            });
        }

        user.referralCode = code;

        await user.save();

        console.log(
            "✅ REFERRAL NUMBER CREATED:",
            code,
            "FOR USER:",
            user._id.toString()
        );

        return code;
    },


    // =====================================================
    // COMPLETE A REFERRAL
    // =====================================================

    async complete(code, referredUserId) {

        if (!code) {
            return null;
        }

        const cleanCode =
            code
                .trim()
                .toUpperCase();

        console.log(
            "🔎 LOOKING FOR REFERRER:",
            cleanCode
        );

        const referrer =
            await User.findOne({
                referralCode: cleanCode
            });

        if (!referrer) {

            throw new Error(
                "Invalid referral number"
            );
        }

        // Prevent self-referral
        if (
            referrer._id.toString() ===
            referredUserId.toString()
        ) {

            throw new Error(
                "You cannot use your own referral number"
            );
        }

        // Prevent duplicate referral
        const existing =
            await Referral.findOne({
                referredUser: referredUserId
            });

        if (existing) {

            console.log(
                "⚠️ USER ALREADY HAS REFERRAL:",
                existing._id
            );

            return mapper.toDTO(existing);
        }

        // Create the actual referral record
        const referral =
            await Referral.create({

                referrer:
                    referrer._id,

                referredUser:
                    referredUserId,

                code:
                    cleanCode,

                status:
                    "completed",

                referrerReward: {
                    tokens: 1000,
                    points: 10,
                    rewardGiven: true
                },

                referredUserReward: {
                    tokens: 500,
                    points: 5,
                    rewardGiven: true
                }

            });

        // Record referrer on User
        await User.findByIdAndUpdate(
            referredUserId,
            {
                referredBy: referrer._id
            }
        );

        console.log(
            "✅ REFERRAL RECORDED:",
            referral._id.toString()
        );

        console.log(
            "REFERRER:",
            referrer.username
        );

        console.log(
            "REFERRED USER:",
            referredUserId.toString()
        );

        console.log(
    "REFERRER REWARD: 1000 BLYNK TOKENS / 10 BLYNK POINTS"
);

console.log(
    "NEW USER REWARD: 500 BLYNK TOKENS / 5 BLYNK POINTS"
);

        eventBus.emit(
            events.REFERRAL_COMPLETED,
            referral
        );

        return mapper.toDTO(referral);
    },

    // =====================================================
// REWARD REFERRAL AFTER EMAIL VERIFICATION
// =====================================================

async rewardReferral(referredUserId) {

    console.log(
        "🎁 REWARD REFERRAL FOR:",
        referredUserId.toString()
    );

    const referral =
        await Referral.findOne({
            referredUser: referredUserId,
            status: "completed"
        });

    if (!referral) {

        console.log(
            "ℹ️ NO REFERRAL FOUND FOR USER"
        );

        return {
            rewarded: false,
            message: "No referral found"
        };
    }


    // =================================================
    // PREVENT DOUBLE REWARD
    // =================================================

   const referrerAlreadyRewarded =
    referral.referrerReward?.rewardGiven === true;

const referredUserAlreadyRewarded =
    referral.referredUserReward?.rewardGiven === true;

if (
    referrerAlreadyRewarded &&
    referredUserAlreadyRewarded
) {

    console.log(
        "⚠️ REFERRAL ALREADY FULLY REWARDED"
    );

    return {
        rewarded: false,
        alreadyRewarded: true,
        message: "Referral already rewarded"
    };
}


    // =================================================
    // LOAD WALLET SERVICE
    // =================================================

    const walletService =
        require("../wallet/wallet.service");


    // =================================================
    // REWARD REFERRER
    // =================================================

    if (
        !referral.referrerReward.rewardGiven
    ) {

        await walletService.addReferralReward(
            referral.referrer,
            referral.referrerReward.tokens,
            referral.referrerReward.points
        );

        referral.referrerReward.rewardGiven =
            true;

        referral.referrerReward.rewardedAt =
            new Date();

        console.log(
            "✅ REFERRER REWARDED:",
            referral.referrer.toString()
        );
    }


    // =================================================
    // REWARD NEW USER
    // =================================================

    if (
        !referral.referredUserReward.rewardGiven
    ) {

        await walletService.addReferralReward(
            referral.referredUser,
            referral.referredUserReward.tokens,
            referral.referredUserReward.points
        );

        referral.referredUserReward.rewardGiven =
            true;

        referral.referredUserReward.rewardedAt =
            new Date();

        console.log(
            "✅ REFERRED USER REWARDED:",
            referral.referredUser.toString()
        );
    }


    // =================================================
    // SAVE REFERRAL
    // =================================================

    await referral.save();


    // =================================================
    // MARK USER AS REWARDED
    // =================================================

    await User.findByIdAndUpdate(
        referredUserId,
        {
            referralRewarded: true
        }
    );


    console.log(
        "🎉 REFERRAL REWARDS COMPLETED"
    );


    return {
        rewarded: true,
        referral: mapper.toDTO(referral)
    };
},


    // =====================================================
    // GET USER REFERRALS
    // =====================================================

    async getUserReferrals(userId) {

        const referrals =
            await Referral.find({
                referrer: userId
            })
            .populate(
                "referredUser",
                "username email firstName lastName"
            )
            .sort({
                createdAt: -1
            });

        return referrals.map(
            mapper.toDTO
        );
    },


    // =====================================================
    // GET REFERRAL STATS
    // =====================================================

    async stats() {

        const total =
            await Referral.countDocuments();

        const completed =
            await Referral.countDocuments({
                status: "completed"
            });

        const pending =
            await Referral.countDocuments({
                status: "pending"
            });

        return {
            total,
            completed,
            pending
        };
    }

};