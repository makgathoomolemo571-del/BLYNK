const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./audit.controller");

// Get all audit logs
router.get(
    "/",
    auth,
    policy({
        auth: true,
        admin: true,
        audit: "VIEW_AUDIT_LOGS",
        report: true
    }),
    controller.getAll
);

// Audit statistics
router.get(
    "/stats",
    auth,
    policy({
        auth: true,
        admin: true,
        audit: "VIEW_AUDIT_STATS",
        report: true
    }),
    controller.stats
);

// Logs for one user
router.get(
    "/user/:userId",
    auth,
    policy({
        auth: true,
        admin: true,
        audit: "VIEW_USER_AUDIT"
    }),
    controller.getByUser
);

// Internal audit logging
router.post(
    "/log",
    auth,
    policy({
        auth: true,
        admin: true,
        audit: "CREATE_AUDIT_LOG",
        system: true
    }),
    controller.log
);

module.exports = router;