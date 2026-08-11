const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const controller = require("./reward.controller");
const validate = require("../../middleware/validation.middleware");
const validator = require("./reward.validator");

router.post(
  "/",
  auth,
  validate(validator.createReward),
  controller.create
);

router.get(
  "/mine",
  auth,
  controller.mine
);

router.post(
  "/:id/redeem",
  auth,
  controller.redeem
);

router.get(
  "/stats",
  auth,
  controller.stats
);

module.exports = router;