const Rules = require("../rules");

module.exports = (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Authentication required."
        });
    }

    if (!req.user.emailVerified) {
        return res.status(403).json({
            success: false,
            message: "Please verify your email address."
        });
    }

    if (
        Rules.Account &&
        typeof Rules.Account.canUsePlatform === "function"
    ) {

        const account = Rules.Account.canUsePlatform(req.user);

        if (!account.allowed) {
            return res.status(403).json({
                success: false,
                message: account.code
            });
        }

    }

    next();

};