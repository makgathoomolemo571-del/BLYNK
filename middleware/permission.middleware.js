const Rules = require("../rules");
const Subscription = require("../modules/subscription/subscription.model");

// ==========================
// FEATURE PERMISSION
// ==========================

const can = (feature) => {

    return async (req, res, next) => {

        try {

            if (!req.user) {
                return res.status(401).json({
                    message: "Unauthorized"
                });
            }

            const subscription =
                await Subscription.findOne({
                    user: req.user._id,
                    status: "active"
                });

            if (!subscription) {
                return res.status(403).json({
                    message: "No active subscription"
                });
            }

            const result =
                Rules.Feature.canAccess(
                    req.user,
                    subscription,
                    feature
                );

            if (!result.allowed) {
                return res.status(403).json({
                    message: result.message || "Access denied",
                    code: result.code
                });
            }

            req.subscription = subscription;

            next();

        } catch (err) {

            next(err);

        }

    };

};

// ==========================
// ROLE
// ==========================

const role = (...roles) => {

    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const result =
            Rules.Role.canAccess(
                req.user,
                roles
            );

        if (!result.allowed) {
            return res.status(403).json({
                message: result.message,
                code: result.code
            });
        }

        next();

    };

};

// ==========================
// PERMISSION
// ==========================

const permission = (permissionName) => {

    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const result =
            Rules.Permission.can(
                req.user,
                permissionName
            );

        if (!result.allowed) {
            return res.status(403).json({
                message: result.message,
                code: result.code
            });
        }

        next();

    };

};

module.exports = {
    can,
    role,
    permission
};