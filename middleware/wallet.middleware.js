const Wallet = require("../modules/wallet/wallet.model");
const Rules = require("../rules");

module.exports = async (req, res, next) => {

    try {

        const wallet = await Wallet.findOne({
            user: req.user._id
        });

        if (!wallet) {
            return res.status(404).json({
                success: false,
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