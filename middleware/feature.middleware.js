// middleware/feature.middleware.js

const Rules = require("../rules");

module.exports = (...features) => {

    return async (req, res, next) => {

        try {

            const user = req.user;

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Authentication required."
                });
            }

            for (const feature of features) {

                const result = Rules.Feature.canAccess(
                    user,
                    feature
                );

                if (!result.allowed) {

                    return res.status(403).json({
                        success: false,
                        code: result.code || "FEATURE_NOT_AVAILABLE",
                        message:
                            result.message ||
                            "This feature is not available for your account."
                    });

                }

            }

            next();

        } catch (err) {

            next(err);

        }

    };

};