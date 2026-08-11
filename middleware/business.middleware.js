const Rules = require("../rules");

module.exports = (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Authentication required."
        });
    }

    const role = Rules.Role.isBusiness(req.user);

    if (!role) {
        return res.status(403).json({
            success: false,
            message: "Business account required."
        });
    }

    const business = Rules.Business.canAccessStudio(req.user);

    if (!business.allowed) {
        return res.status(403).json({
            success: false,
            message: business.code
        });
    }

    next();

};