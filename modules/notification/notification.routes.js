const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./notification.controller");

// Get my notifications
router.get(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        notification: true,
        session: true,
        security: true
    }),
    controller.getMine
);

// Mark notification as read
router.patch(
    "/:id/read",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        notification: true,
        permission: "notification:read",
        session: true,
        security: true,
        audit: "notification.read"
    }),
    controller.read
);

module.exports = router;