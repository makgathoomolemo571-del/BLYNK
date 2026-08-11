const Subscription = require("../modules/subscription/subscription.model");
const Rules = require("../rules");

module.exports = (feature = "MONETIZATION") => {

    return async (req, res, next) => {

        try {

            const subscription = await Subscription.findOne({
                user: req.user._id,
                status: "active"
            });

            if (!subscription) {
                return res.status(403).json({
                    message: "No active subscription."
                });
            }

            const result = Rules.Feature.canAccess(
                req.user,
                subscription,
                feature
            );

            if (!result.allowed) {
                return res.status(403).json({
                    message: result.message || "Upgrade required."
                });
            }

            req.subscription = subscription;

            next();

        } catch (err) {
            next(err);
        }

    };

};