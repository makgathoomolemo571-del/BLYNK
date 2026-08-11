const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const controller = require("./referral.controller");

router.post("/create", auth, controller.create);

router.post("/complete", auth, controller.complete);

router.post("/:id/reward", auth, controller.reward);

router.get("/mine", auth, controller.mine);

router.get("/stats", auth, controller.stats);

module.exports = router;