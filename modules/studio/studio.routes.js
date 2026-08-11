const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const controller = require("./studio.controller");
const validate = require("../../middleware/validation.middleware");
const validator = require("./studio.validator");

router.post(
  "/",
  auth,
  validate(validator.create),
  controller.create
);

router.get("/mine", auth, controller.mine);

router.get("/:id", auth, controller.get);

router.patch("/:id", auth, controller.update);

router.delete("/:id", auth, controller.remove);

module.exports = router;