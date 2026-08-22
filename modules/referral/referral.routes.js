const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const controller = require("./referral.controller");

// =====================================================
// GET MY REFERRAL NUMBER
// GET /api/referral/me
// =====================================================

router.get(
    "/me",
    auth,
    controller.me
);


// =====================================================
// GENERATE MY REFERRAL NUMBER
// POST /api/referral/generate
// =====================================================

router.post(
    "/generate",
    auth,
    controller.generate
);


// =====================================================
// COMPLETE REFERRAL
// POST /api/referral/complete
// =====================================================

router.post(
    "/complete",
    auth,
    controller.complete
);


// =====================================================
// REWARD REFERRAL
// POST /api/referral/:id/reward
// =====================================================

router.post(
    "/:id/reward",
    auth,
    controller.reward
);


// =====================================================
// REFERRAL HISTORY
// GET /api/referral/mine
// =====================================================

router.get(
    "/mine",
    auth,
    controller.mine
);


// =====================================================
// REFERRAL STATS
// GET /api/referral/stats
// =====================================================

router.get(
    "/stats",
    auth,
    controller.stats
);


module.exports = router;