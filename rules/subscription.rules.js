const plans = require("../config/plans.config");

class SubscriptionRules {

static canUse(user) {
        if (!user) {
            return {
                allowed: false,
                code: "LOGIN_REQUIRED"
            };
        }

        return {
            allowed: true,
            code: "OK"
        };

    }

    // =============================
    // BASIC VALIDATION
    // =============================

    static planExists(planId) {
        return !!plans[planId];
    }

    static getPlan(planId) {
        return plans[planId] || null;
    }

    static isFree(planId) {
        return plans[planId]?.price === 0;
    }

    static isPaid(planId) {
        return plans[planId]?.price > 0;
    }

    // =============================
    // USER STATUS
    // =============================

    static canSubscribe(user) {

        if (!user)
            return false;

        if (!user.emailVerified)
            return false;

        if (user.status !== "ACTIVE")
            return false;

        if (user.isDeleted)
            return false;

        if (user.isSuspended)
            return false;

        return true;

    }

    // =============================
    // PAYMENT
    // =============================

    static canActivateSubscription(payment) {

        if (!payment)
            return false;

        if (payment.status !== "SUCCESS")
            return false;

        if (!payment.approved)
            return false;

        if (!payment.verified)
            return false;

        if (payment.refunded)
            return false;

        return true;

    }

    // =============================
    // UPGRADE
    // =============================

    static canUpgrade(user, currentPlan, newPlan) {

        if (!this.canSubscribe(user))
            return false;

        if (!this.planExists(currentPlan))
            return false;

        if (!this.planExists(newPlan))
            return false;

        if (currentPlan === newPlan)
            return false;

        return true;

    }

    // =============================
    // DOWNGRADE
    // =============================

    static canDowngrade(user) {

        if (!this.canSubscribe(user))
            return false;

        return true;

    }

    // =============================
    // CANCELLATION
    // =============================

    static canCancel(subscription) {

        if (!subscription)
            return false;

        if (subscription.status !== "ACTIVE")
            return false;

        return true;

    }

    // =============================
    // RENEWAL
    // =============================

    static canRenew(subscription) {

        if (!subscription)
            return false;

        return subscription.autoRenew === true;

    }

    // =============================
    // EXPIRY
    // =============================

    static isExpired(subscription) {

        if (!subscription)
            return true;

        return new Date(subscription.expiresAt) < new Date();

    }

    // =============================
    // FEATURE ACCESS
    // =============================

    static hasFeature(user, feature) {

        const plan = user.subscription;

        switch (plan) {

            case "FREE_MEMBER":

                return [
                    "feed",
                    "profile",
                    "messages"
                ].includes(feature);

            case "MEMBER_BASIC":

                return true;

            case "MEMBER_PLUS":

                return true;

            case "CREATOR_BASIC":

                return true;

            case "CREATOR_PLUS":

                return true;

            case "CREATOR_PRO":

                return true;

            case "BUSINESS_BASIC":

                return true;

            case "BUSINESS_PRO":

                return true;

            case "BUSINESS_ENTERPRISE":

                return true;

            default:

                return false;

        }

    }

}

module.exports = SubscriptionRules;