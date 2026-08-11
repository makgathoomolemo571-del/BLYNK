const plans = require("../config/plans.config");

const PAYMENT_STATUS = {
    PENDING: "PENDING",
    PROCESSING: "PROCESSING",
    AUTHORIZED: "AUTHORIZED",
    SUCCESS: "SUCCESS",
    FAILED: "FAILED",
    CANCELLED: "CANCELLED",
    REFUNDED: "REFUNDED",
    CHARGEBACK: "CHARGEBACK",
    EXPIRED: "EXPIRED"
};

const PAYMENT_METHODS = [
    "CARD",
    "EFT",
    "APPLE_PAY",
    "GOOGLE_PAY",
    "OZOW",
    "PAYFAST",
    "PEACH_PAYMENTS"
];

class PaymentRules {

    static canPay(user, wallet) {

    if (!wallet) return false;

    return (
        wallet.status === "ACTIVE" &&
        wallet.isBlocked !== true
    );

}
static canPay(user) {

    if (!user) {
        return {
            allowed: false,
            code: "NOT_AUTHENTICATED"
        };
    }

    if (user.status !== "active") {
        return {
            allowed: false,
            code: "ACCOUNT_INACTIVE"
        };
    }

    return {
        allowed: true,
        code: "OK"
    };
}
    /**
     * Check payment status before anything happens.
     */
    static canActivateSubscription(payment) {

        return (
            payment &&
            payment.status === PAYMENT_STATUS.SUCCESS
        );

    }

    /**
     * Verify transaction has not already been processed.
     */
    static isDuplicate(transaction, existingPayment) {

        if (!transaction || !existingPayment)
            return false;

        return (
            transaction.transactionId ===
            existingPayment.transactionId
        );

    }

    /**
     * Verify payment amount matches plan.
     */
    static amountMatches(planCode, amount) {

        const plan = plans[planCode];

        if (!plan)
            return false;

        return Number(amount) === Number(plan.price);

    }

    /**
     * Verify supported currency.
     */
    static currencyMatches(planCode, currency) {

        const plan = plans[planCode];

        if (!plan)
            return false;

        return (
            currency.toUpperCase() ===
            plan.currency
        );

    }

    /**
     * Verify gateway returned approved response.
     */
    static gatewayApproved(payment) {

        return payment.gatewayApproved === true;

    }

    /**
     * Verify payment has transaction id.
     */
    static hasTransaction(payment) {

        return Boolean(payment.transactionId);

    }

    /**
     * Verify invoice exists.
     */
    static hasInvoice(payment) {

        return Boolean(payment.invoiceId);

    }

    /**
     * Verify webhook signature.
     */
    static verifyWebhook(payment) {

        return payment.signatureVerified === true;

    }

    /**
     * Verify payment method allowed.
     */
    static validMethod(method) {

        return PAYMENT_METHODS.includes(method);

    }

    /**
     * Verify payment can be refunded.
     */
    static canRefund(payment) {

        return (

            payment.status === PAYMENT_STATUS.SUCCESS &&

            !payment.refunded &&

            !payment.chargeback

        );

    }

    /**
     * Verify payment can update subscription.
     */
    static canChangeSubscription(payment) {

        return (

            this.canActivateSubscription(payment) &&

            this.gatewayApproved(payment) &&

            this.hasTransaction(payment) &&

            this.hasInvoice(payment) &&

            this.verifyWebhook(payment)

        );

    }

}

module.exports = {
    PAYMENT_STATUS,
    PAYMENT_METHODS,
    PaymentRules
};