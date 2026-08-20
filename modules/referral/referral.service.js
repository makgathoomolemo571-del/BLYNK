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
                    rewardGiven: false
                },

                referredUserReward: {
                    tokens: 500,
                    points: 5,
                    rewardGiven: false
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
            "REFERRER REWARD: 1000 TOKENS / 10 POINTS"
        );

        console.log(
            "NEW USER REWARD: 500 TOKENS / 5 POINTS"
        );

        eventBus.emit(
            events.REFERRAL_COMPLETED,
            referral
        );

        return mapper.toDTO(referral);
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