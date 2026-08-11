const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./moderation.controller");

// Submit a report
router.post(
    "/report",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        content: true,
        report: true,
        security: true
    }),
    controller.submitReport
);

// View all reports
router.get(
    "/reports",
    auth,
    policy({
        auth: true,
        account: true,
        role: ["admin", "superadmin"],
        admin: true,
        audit: "VIEW_REPORTS",
        report: true,
        security: true
    }),
    controller.getReports
);

// View one report
router.get(
    "/reports/:id",
    auth,
    policy({
        auth: true,
        account: true,
        role: ["admin", "superadmin"],
        admin: true,
        audit: "VIEW_REPORT",
        report: true,
        security: true
    }),
    controller.getReport
);

// Review report
router.patch(
    "/reports/:id/review",
    auth,
    policy({
        auth: true,
        account: true,
        role: ["admin", "superadmin"],
        admin: true,
        permission: "REPORT_REVIEW",
        audit: "REVIEW_REPORT",
        report: true,
        security: true
    }),
    controller.reviewReport
);

// Approve report
router.patch(
    "/reports/:id/approve",
    auth,
    policy({
        auth: true,
        account: true,
        role: ["admin", "superadmin"],
        admin: true,
        permission: "REPORT_APPROVE",
        audit: "APPROVE_REPORT",
        report: true,
        security: true
    }),
    controller.approve
);

// Reject report
router.patch(
    "/reports/:id/reject",
    auth,
    policy({
        auth: true,
        account: true,
        role: ["admin", "superadmin"],
        admin: true,
        permission: "REPORT_REJECT",
        audit: "REJECT_REPORT",
        report: true,
        security: true
    }),
    controller.reject
);

module.exports = router;