const service = require("./referral.service");

// =====================================================
// GENERATE MY REFERRAL NUMBER
// =====================================================

exports.generate = async (req, res, next) => {
    try {

        const userId =
            req.user.userId ||
            req.user._id;

        console.log(
            "GENERATE REFERRAL FOR:",
            userId
        );

        const referralCode =
            await service.createUserReferralCode(
                userId
            );

        return res.status(200).json({

            success: true,

            referralCode

        });

    } catch (err) {

        console.error(
            "GENERATE REFERRAL ERROR:",
            err
        );

        next(err);
    }
};


// =====================================================
// GET MY REFERRAL NUMBER
// =====================================================

exports.me = async (req, res, next) => {

    try {

        const userId =
            req.user.userId ||
            req.user._id;

        const User =
            require("../user/user.model");

        const user =
            await User.findById(userId)
                .select("referralCode");

        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found"

            });
        }

        return res.json({

            success: true,

            referralCode:
                user.referralCode || null

        });

    } catch (err) {

        console.error(
            "GET REFERRAL ERROR:",
            err
        );

        next(err);
    }
};


// =====================================================
// COMPLETE REFERRAL
// =====================================================

exports.complete = async (req, res, next) => {

    try {

        const referredUserId =
            req.user.userId ||
            req.user._id;

        const result =
            await service.complete(
                req.body.code,
                referredUserId
            );

        res.json(result);

    } catch (err) {

        next(err);
    }
};


// =====================================================
// REWARD REFERRAL
// =====================================================

exports.reward = async (req, res, next) => {

    try {

        const result =
            await service.rewardReferral(
                req.body.referredUserId
            );

        res.json(result);

    } catch (err) {

        next(err);
    }
};


// =====================================================
// REFERRAL HISTORY
// =====================================================

exports.mine = async (req, res, next) => {

    try {

        const userId =
            req.user.userId ||
            req.user._id;

        const result =
            await service.getUserReferrals(
                userId
            );

        res.json({

            success: true,

            referrals: result

        });

    } catch (err) {

        next(err);
    }
};


// =====================================================
// REFERRAL STATS
// =====================================================

exports.stats = async (req, res, next) => {

    try {

        const result =
            await service.stats();

        res.json(result);

    } catch (err) {

        next(err);
    }
};