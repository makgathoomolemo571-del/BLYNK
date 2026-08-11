const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("../subscription/subscription.controller");

router.post(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        payment: true,
        subscription: true,
        audit: "SUBSCRIPTION_CREATE"
    }),
    controller.create
);

router.patch(
    "/upgrade",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        payment: true,
        subscription: true,
        audit: "SUBSCRIPTION_UPGRADE"
    }),
    controller.upgrade
);

router.patch(
    "/cancel",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        subscription: true,
        audit: "SUBSCRIPTION_CANCEL"
    }),
    controller.cancel
);

router.get(
    "/me",
    auth,
    policy({
        auth: true,
        account: true,
        subscription: false
        
    }),
    controller.getMine
);

module.exports = router;