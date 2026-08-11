const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./watchparty.controller");

router.post(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        content: true,
        feature: "WATCHPARTY_CREATE",
        subscription: [
            "FREE_CREATOR",
    "CREATOR_BASIC",
    "CREATOR_PLUS",
    "CREATOR_PRO",
     "FREE_BUSINESS",
    "BUSINESS_BASIC",
    "BUSINESS_PRO",
    "BUSINESS_ENTERPRISE"
        ],
        audit: "WATCHPARTY_CREATE"
    }),
    controller.create
);

router.get(
    "/live",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        feature: "WATCHPARTY_VIEW"
    }),
    controller.live
);

router.get(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        feature: "WATCHPARTY_VIEW"
    }),
    controller.getById
);

router.patch(
    "/:id/start",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "WATCHPARTY_START",
        audit: "WATCHPARTY_START"
    }),
    controller.start
);

router.patch(
    "/:id/end",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "WATCHPARTY_END",
        audit: "WATCHPARTY_END"
    }),
    controller.end
);

router.post(
    "/:id/join",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        feature: "WATCHPARTY_JOIN"
    }),
    controller.join
);

router.post(
    "/:id/leave",
    auth,
    policy({
        auth: true,
        account: true
    }),
    controller.leave
);

router.delete(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "WATCHPARTY_DELETE",
        audit: "WATCHPARTY_DELETE"
    }),
    controller.delete
);

module.exports = router;