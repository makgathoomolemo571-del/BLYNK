const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const controller = require("./referral.controller");

// Generate my referral number
router.post("/generate", auth, controller.generate);

// Get my referral number
router.get("/me", auth, controller.me);

// Complete a referral during registration
router.post("/complete", auth, controller.complete);

// Reward referral
router.post("/:id/reward", auth, controller.reward);

// Referral history
router.get("/mine", auth, controller.mine);

// Referral stats
router.get("/stats", auth, controller.stats);

module.exports = router;