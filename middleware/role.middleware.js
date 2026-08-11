// middleware/role.middleware.js

const Rules = require("../rules");

module.exports = (...roles) => {

    return async (req, res, next) => {

        try {

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "Authentication required."
                });
            }

            const role =
                Rules.Role.canAccessRole(
                    req.user,
                    roles
                );

            if (!role.allowed) {

                return res.status(403).json({
                    success: false,
                    code: role.code,
                    message:
                        role.message ||
                        "You do not have permission to access this resource."
                });

            }

            next();

        } catch (err) {

            next(err);

        }

    };

};