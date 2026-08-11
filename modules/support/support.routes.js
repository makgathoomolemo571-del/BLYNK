const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./support.controller");

// Create support ticket
router.post(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true
    }),
    controller.createTicket
);

// My tickets
router.get(
    "/my",
    auth,
    policy({
        auth: true,
        account: true
    }),
    controller.getMyTickets
);

// View ticket
router.get(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true
    }),
    controller.getTicket
);

// Assign ticket (Support Staff/Admin)
router.patch(
    "/:id/assign",
    auth,
    policy({
        auth: true,
        account: true,
        role: ["admin", "superadmin"],
        admin: true,
        audit: "SUPPORT_ASSIGN"
    }),
    controller.assignTicket
);

// Change status
router.patch(
    "/:id/status",
    auth,
    policy({
        auth: true,
        account: true,
        role: ["admin", "superadmin"],
        admin: true,
        audit: "SUPPORT_STATUS_CHANGE"
    }),
    controller.updateStatus
);

// Resolve ticket
router.patch(
    "/:id/resolve",
    auth,
    policy({
        auth: true,
        account: true,
        role: ["admin", "superadmin"],
        admin: true,
        audit: "SUPPORT_RESOLVE"
    }),
    controller.resolveTicket
);

// Close ticket
router.patch(
    "/:id/close",
    auth,
    policy({
        auth: true,
        account: true,
        role: ["admin", "superadmin"],
        admin: true,
        audit: "SUPPORT_CLOSE"
    }),
    controller.closeTicket
);

module.exports = router;