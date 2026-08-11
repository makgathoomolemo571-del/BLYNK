const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./application.controller");

// Apply for a job
router.post(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "APPLICATION_CREATE"
    }),
    controller.create
);

// My applications
router.get(
    "/my",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "APPLICATION_VIEW"
    }),
    controller.getMine
);

// View one application
router.get(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "APPLICATION_VIEW"
    }),
    controller.getById
);

// Employer/Admin changes application status
router.patch(
    "/:id/status",
    auth,
    policy({
        auth: true,
        account: true,
        role: ["creator", "business", "admin", "superadmin"],
        business: true,
        permission: "APPLICATION_UPDATE",
        audit: "APPLICATION_STATUS_UPDATED"
    }),
    controller.updateStatus
);

// Applicant withdraws application
router.patch(
    "/:id/withdraw",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "application:withdraw",
        audit: "APPLICATION_WITHDRAWN"
    }),
    controller.withdraw
);

module.exports = router;