const Subscription = require("../modules/subscription/subscription.model");
const Rules = require("../rules");

module.exports = function subscriptionMiddleware(requiredPlans = []) {

    return async (req, res, next) => {

        try {

            if (!req.user) {
                return res.status(401).json({
                    message: "Authentication required"
                });
            }

            const subscription = await Subscription.findOne({
                user: req.user._id,
                status: "active"
            });

            if (!subscription) {
                return res.status(403).json({
                    message: "No active subscription"
                });
            }

            const result = Rules.Subscription.canAccess(
                req.user,
                subscription,
                requiredPlans
            );

            if (!result.allowed) {
                return res.status(403).json({
                    code: result.code,
                    message: result.message
                });
            }

            req.subscription = subscription;

            next();

        } catch (err) {

            next(err);

        }

    };

};