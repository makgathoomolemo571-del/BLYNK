const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");
const validate = require("../../middleware/validation.middleware");

const controller = require("./payment.controller");
const validator = require("./payment.validator");

// Create payment
router.post(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        payment: true,
        wallet: true,
        subscription: true,
        compliance: true,
        security: true,
        api: true,
        audit: "CREATE_PAYMENT"
    }),
    validate(validator.createPayment),
    controller.create
);

// My payments
router.get(
    "/mine",
    auth,
    policy({
        auth: true,
        account: true,
        payment: true,
        wallet: true,
        api: true
    }),
    controller.mine
);

// Payment statistics
router.get(
    "/stats",
    auth,
    policy({
        auth: true,
        payment: true,
        report: true,
        api: true
    }),
    controller.stats
);

// Checkout
router.post(
    "/checkout",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        payment: true,
        wallet: true,
        subscription: true,
        compliance: true,
        security: true,
        api: true,
        audit: "CHECKOUT"
    }),
    controller.createCheckout
);

// Payment gateway callback
router.post(
    "/callback",
    policy({
        api: true,
        system: true
    }),
    controller.callback
);

module.exports = router;