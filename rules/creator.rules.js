// rules/creator.rules.js

const plans = require("../config/plans.config");

class CreatorRules {

    /**
     * Can user create a creator account?
     */
    static canBecomeCreator(user) {

        if (!user) {
            return {
                allowed: false,
                reason: "LOGIN_REQUIRED"
            };
        }

        if (user.accountStatus !== "ACTIVE") {
            return {
                allowed: false,
                reason: "ACCOUNT_NOT_ACTIVE"
            };
        }

        if (!user.emailVerified) {
            return {
                allowed: false,
                reason: "EMAIL_NOT_VERIFIED"
            };
        }

        if (user.isBanned) {
            return {
                allowed: false,
                reason: "ACCOUNT_BANNED"
            };
        }

        return {
            allowed: true
        };
    }

    /**
     * Creator dashboard access
     */
static canAccessDashboard(user) {

    const allowedPlans = [
        "ALL"
    ];

    const plan =
        user.subscriptionPlan ||
        user.subscription?.plan ||
        "FREE_MEMBER";

    if (allowedPlans.includes("ALL")) {
        return {
            allowed: true,
            code: "OK"
        };
    }

    return {
        allowed: allowedPlans.includes(plan),
        code: allowedPlans.includes(plan)
            ? "OK"
            : "PLAN_NOT_ALLOWED"
    };
}

    /**
     * Live Streaming
     */

    static canGoLive(user) {

        return [

            "CREATOR_PLUS",
            "CREATOR_PRO"

        ].includes(user.subscription.plan);
    }

    /**
     * Monetization
     */

    static canMonetize(user) {

        return [

            "CREATOR_BASIC",
            "CREATOR_PLUS",
            "CREATOR_PRO"

        ].includes(user.subscription.plan);
    }

    /**
     * Sell Courses
     */

    static canSellCourses(user) {

        return [

            "CREATOR_PLUS",
            "CREATOR_PRO"

        ].includes(user.subscription.plan);
    }

    /**
     * Podcasts
     */

    static canCreatePodcast(user) {

        return [

            "CREATOR_PLUS",
            "CREATOR_PRO"

        ].includes(user.subscription.plan);
    }

    /**
     * Premium Analytics
     */

    static canViewAdvancedAnalytics(user) {

        return user.subscription.plan === "CREATOR_PRO";
    }

    /**
     * Brand Deals
     */

    static canReceiveBrandDeals(user) {

        return [

            "CREATOR_PLUS",
            "CREATOR_PRO"

        ].includes(user.subscription.plan);
    }

    /**
     * Verification Request
     */

    static canRequestVerification(user) {

        return [

            "CREATOR_PRO"

        ].includes(user.subscription.plan);
    }

    /**
     * AI Studio
     */

    static canUseAI(user) {

        return [

            "CREATOR_PRO"

        ].includes(user.subscription.plan);
    }

    /**
     * Maximum Videos
     */

    static maxVideos(plan) {

        switch (plan) {

            case "FREE_CREATOR":
                return 20;

            case "CREATOR_BASIC":
                return 250;

            case "CREATOR_PLUS":
                return 2000;

            case "CREATOR_PRO":
                return Infinity;

            default:
                return 0;
        }

    }

    /**
     * Maximum Storage
     */

    static storageLimit(plan) {

        switch (plan) {

            case "FREE_CREATOR":
                return 2;

            case "CREATOR_BASIC":
                return 50;

            case "CREATOR_PLUS":
                return 250;

            case "CREATOR_PRO":
                return 1000;

            default:
                return 0;
        }

    }

    /**
     * Can upgrade?
     */

    static canUpgrade(user) {

        if (!user.subscription)
            return false;

        return user.subscription.status === "ACTIVE";
    }

    /**
     * Can downgrade?
     */

    static canDowngrade(user) {

        return user.subscription.status === "ACTIVE";
    }

}

module.exports = CreatorRules;