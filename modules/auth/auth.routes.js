const router = require("express").Router();
const authenticate = require("../../middleware/auth.middleware");
const controller = require("./auth.controller");
const rateLimit = require("../../middleware/rateLimit.middleware");
const validation = require("../../middleware/validation.middleware");

const {
    registerValidator,
    loginValidator
} = require("./auth.validator");

router.post(
    "/register",
    rateLimit(),
    validation(registerValidator),
    controller.register
);

router.post(
    "/login",
    rateLimit(),
    validation(loginValidator),
    controller.login
);

router.get(
  "/me",
  authenticate,
  controller.getMe
);

router.get(
    "/verify-email",
    controller.openVerificationPage
);

router.post(
    "/verify-email",
    controller.verifyEmail
);

router.post(
    "/resend-verification",
    rateLimit(),
    controller.resendVerification
);

router.post(
    "/forgot-password",
    rateLimit(),
    controller.forgotPassword
);

router.post(
    "/reset-password",
    rateLimit(),
    controller.resetPassword
);

module.exports = router;