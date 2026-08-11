const Rules = require("../rules");

module.exports = (...requiredStatuses) => {

    return async (req, res, next) => {

        try {

            const payment =
                req.payment;

            if (!payment) {

                return res.status(400).json({
                    success: false,
                    message: "Payment not found."
                });

            }

            const rule =
                Rules.Payment.canUsePayment(
                    payment,
                    req.user
                );

            if (!rule.allowed) {

                return res.status(403).json({
                    success: false,
                    message: rule.code
                });

            }

            if (
                requiredStatuses.length &&
                !requiredStatuses.includes(
                    payment.status
                )
            ) {

                return res.status(403).json({
                    success: false,
                    message: "Payment status not allowed."
                });

            }

            next();

        } catch (err) {

            next(err);

        }

    };

};