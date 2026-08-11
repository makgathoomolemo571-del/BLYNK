const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./analytics.controller");

// Track analytics
router.post(
    "/track",
    auth,
    policy({
        auth: true,
        account: true,
        session: true,
        security: true,
        feature: "analytics",
        analytics: true,
        audit: "ANALYTICS_TRACK"
    }),
    controller.track
);

// Logged-in user's analytics
router.get(
    "/me",
    auth,
    policy({
        auth: true,
        account: true,
        session: true,
        security: true,
        feature: "analytics"
    }),
    controller.userAnalytics
);

// Creator analytics
router.get(
    "/creator",
    auth,
    policy({
        auth: true,
        account: true,
        role: ["creator"],
        creator: true,
        subscription: [
            "CREATOR_BASIC",
            "CREATOR_PRO",
            "CREATOR_PREMIUM"
        ],
        feature: "creator_analytics",
        audit: "VIEW_CREATOR_ANALYTICS"
    }),
    controller.creatorAnalytics
);

// Platform analytics
router.get(
    "/platform",
    auth,
    policy({
        auth: true,
        account: true,
        role: [
            "admin",
            "superadmin"
        ],
        admin: true,
        system: true,
        report: true,
        audit: "VIEW_PLATFORM_ANALYTICS"
    }),
    controller.platformAnalytics
);

module.exports = router;