const Rules = require("../rules");

module.exports = (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Authentication required."
        });
    }

    const role = Rules.Role.isCreator(req.user);

    if (!role) {
        return res.status(403).json({
            success: false,
            message: "Creator account required."
        });
    }

    const creator = Rules.Creator.canAccessStudio(req.user);

    if (!creator.allowed) {
        return res.status(403).json({
            success: false,
            message: creator.code
        });
    }

    next();

};