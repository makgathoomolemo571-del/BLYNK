const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./monetization.controller");
console.log("MONETIZATION ROUTER LOADED");
router.get(
    "/dashboard",
    auth,
    policy({
        auth: true,
        
        subscription: [
           "FREE_MEMBER",
                "MEMBER_BASIC",
                "MEMBER_PLUS",

                "FREE_CREATOR",
                "CREATOR_BASIC",
                "CREATOR_PLUS",
                "CREATOR_PRO",

                "FREE_BUSINESS",
                "BUSINESS_BASIC",
                "BUSINESS_PRO",
                "BUSINESS_ENTERPRISE"
        ],
        feature: "MONETIZATION_DASHBOARD",
        monetization: true,
        analytics: true
    }),
    controller.dashboard
);

router.get(
    "/wallet",
    auth,
    policy({
        auth: true,
        wallet: true,
        payment: true
    }),
    controller.wallet
);

router.get(
    "/revenue",
    auth,
    policy({
        auth: true,
        creator: true,
        subscription: [
            "FREE_MEMBER",
                "MEMBER_BASIC",
                "MEMBER_PLUS",

                "FREE_CREATOR",
                "CREATOR_BASIC",
                "CREATOR_PLUS",
                "CREATOR_PRO",

                "FREE_BUSINESS",
                "BUSINESS_BASIC",
                "BUSINESS_PRO",
                "BUSINESS_ENTERPRISE"
        ],
        feature: "REVENUE",
        report: true
    }),
    controller.revenue
);

router.get(
    "/analytics",
    auth,
    policy({
        auth: true,
        creator: true,
        subscription: [
            "FREE_MEMBER",
                "MEMBER_BASIC",
                "MEMBER_PLUS",

                "FREE_CREATOR",
                "CREATOR_BASIC",
                "CREATOR_PLUS",
                "CREATOR_PRO",

                "FREE_BUSINESS",
                "BUSINESS_BASIC",
                "BUSINESS_PRO",
                "BUSINESS_ENTERPRISE"
        ],
        feature: "ANALYTICS",
        report: true
    }),
    controller.analytics
);

router.get(
    "/eligibility",
    auth,
    policy({
        auth: true,
        creator: true,
        subscription: [
    "FREE_MEMBER",
    "MEMBER_BASIC",
    "MEMBER_PLUS",
    "FREE_CREATOR",
    "CREATOR_BASIC",
    "CREATOR_PLUS",
    "CREATOR_PRO",
    "FREE_BUSINESS",
    "BUSINESS_BASIC",
    "BUSINESS_PRO",
    "BUSINESS_ENTERPRISE"
],
    }),
    controller.eligibility
);

router.patch(
    "/settings",
    auth,
    policy({
        auth: true,
        creator: true,
        permission: "UPDATE_MONETIZATION_SETTINGS",
        audit: "UPDATE_MONETIZATION_SETTINGS"
    }),
    controller.settings
);

module.exports = router;