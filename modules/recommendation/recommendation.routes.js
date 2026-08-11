const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./recommendation.controller");

// Generate Recommendations
router.get(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        search: true,
        ai: "recommendations"
    }),
    controller.generate
);

// Track Recommendation View
router.post(
    "/:id/view",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        search: true
    }),
    controller.trackView
);

// Track Recommendation Click
router.post(
    "/:id/click",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        search: true
    }),
    controller.trackClick
);

module.exports = router;