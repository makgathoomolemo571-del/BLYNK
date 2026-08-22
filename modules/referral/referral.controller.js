const referralService =
    require("./referral.service");


// =====================================================
// CREATE / GENERATE REFERRAL NUMBER
// =====================================================

exports.create = async (req, res) => {

    try {

        const userId = req.user.userId || req.user._id;

        console.log(
            "GENERATE REFERRAL FOR USER:",
            userId
        );

        const referralCode =
            await referralService.createUserReferralCode(
                userId
            );

        return res.json({

            success: true,

            referralCode

        });

    } catch (error) {

        console.error(
            "CREATE REFERRAL ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to generate referral number."

        });

    }

};


// =====================================================
// GET MY REFERRAL NUMBER
// =====================================================

exports.mine = async (req, res) => {

    try {

        const userId =
            req.user.userId ||
            req.user._id;

        console.log(
            "GET MY REFERRAL FOR USER:",
            userId
        );

        const User =
            require("../user/user.model");

        const user =
            await User.findById(userId)
                .select("referralCode");

        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found."

            });

        }

        return res.json({

            success: true,

            referralCode:
                user.referralCode || null

        });

    } catch (error) {

        console.error(
            "GET MY REFERRAL ERROR:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                error.message ||
                "Failed to fetch referral number."

        });

    }

};