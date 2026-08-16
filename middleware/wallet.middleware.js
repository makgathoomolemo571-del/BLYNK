const Wallet = require("../modules/wallet/wallet.model");
const Rules = require("../rules");

module.exports = async (req, res, next) => {

    try {

        const userId = req.user.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                code: "USER_ID_MISSING",
                message: "Authenticated user ID is missing"
            });
        }

        const wallet = await Wallet.findOne({
            user: userId
        });

        if (!wallet) {
            return res.status(404).json({
                success: false,
                code: "WALLET_NOT_FOUND",
                message: "Wallet not found"
            });
        }

        const rule = Rules.Wallet.canAccess(
            req.user,
            wallet
        );

        if (!rule.allowed) {
            return res.status(403).json({
                success: false,
                code: rule.code,
                message: rule.message
            });
        }

        req.wallet = wallet;

        next();

    } catch (err) {

        next(err);

    }

};