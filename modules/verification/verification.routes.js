const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./verification.controller");

// Submit verification request
router.post(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        verified: false,
        permission: "verification:create",
        compliance: true,
        privacy: true,
        api: true,
        device: true,
        session: true,
        security: true,
        audit: "VERIFICATION_CREATE"
    }),
    controller.create
);

// Current user's verification
router.get(
    "/my",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "verification:view",
        privacy: true,
        api: true,
        device: true,
        session: true,
        security: true
    }),
    controller.getMine
);

// Approve verification (Admin)
router.patch(
    "/:id/approve",
    auth,
    policy({
        auth: true,
        account: true,
        admin: true,
        role: ["admin", "superadmin"],
        permission: "verification:approve",
        compliance: true,
        audit: "VERIFICATION_APPROVED",
        api: true,
        device: true,
        session: true,
        security: true
    }),
    controller.approve
);

// Reject verification (Admin)
router.patch(
    "/:id/reject",
    auth,
    policy({
        auth: true,
        account: true,
        admin: true,
        role: ["admin", "superadmin"],
        permission: "verification:reject",
        compliance: true,
        audit: "VERIFICATION_REJECTED",
        api: true,
        device: true,
        session: true,
        security: true
    }),
    controller.reject
);

module.exports = router;