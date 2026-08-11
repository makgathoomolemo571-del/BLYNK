const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./admin.controller");

// ============================
// Admin Authentication
// ============================

router.post("/login", controller.login);
 
router.post("/logout", auth, controller.logout);

router.get("/me", auth, controller.me);

// Dashboard
router.get(
    "/dashboard",
    auth,
    policy({
        auth: true,
        account: true,
        admin: true,
        role: ["admin", "superadmin"],
        verified: true,
        audit: "ADMIN_DASHBOARD",
        system: true
    }),
    controller.dashboard
);

// Users
router.get(
    "/users",
    auth,
    policy({
        auth: true,
        account: true,
        admin: true,
        permission: "users.read",
        report: true,
        audit: "USERS_VIEW"
    }),
    controller.users
);

router.get(
    "/users/:id",
    auth,
    policy({
        auth: true,
        account: true,
        admin: true,
        permission: "users.read",
        privacy: true,
        audit: "USER_VIEW"
    }),
    controller.user
);

// Suspend
router.patch(
    "/users/:id/suspend",
    auth,
    policy({
        auth: true,
        account: true,
        admin: true,
        permission: "users.suspend",
        audit: "USER_SUSPEND"
    }),
    controller.suspendUser
);

// Unsuspend
router.patch(
    "/users/:id/unsuspend",
    auth,
    policy({
        auth: true,
        account: true,
        admin: true,
        permission: "users.restore",
        audit: "USER_UNSUSPEND"
    }),
    controller.unsuspendUser
);

// Change Role
router.patch(
    "/users/:id/role",
    auth,
    policy({
        auth: true,
        account: true,
        admin: true,
        permission: "users.role",
        audit: "ROLE_CHANGE"
    }),
    controller.changeRole
);

// Reports
router.get(
    "/reports",
    auth,
    policy({
        auth: true,
        admin: true,
        report: true,
        audit: "REPORT_VIEW"
    }),
    controller.reports
);

// Support
router.get(
    "/support",
    auth,
    policy({
        auth: true,
        admin: true,
        permission: "support.manage"
    }),
    controller.support
);

// Verification
router.get(
    "/verification",
    auth,
    policy({
        auth: true,
        admin: true,
        permission: "verification.manage"
    }),
    controller.verification
);

// Subscriptions
router.get(
    "/subscriptions",
    auth,
    policy({
        auth: true,
        admin: true,
        permission: "subscriptions.manage"
    }),
    controller.subscriptions
);

// Wallets
router.get(
    "/wallets",
    auth,
    policy({
        auth: true,
        admin: true,
        wallet: true,
        permission: "wallets.manage",
        audit: "WALLET_VIEW"
    }),
    controller.wallets
);

// Revenues
router.get(
    "/revenues",
    auth,
    policy({
        auth: true,
        admin: true,
        payment: true,
        permission: "revenue.view",
        report: true
    }),
    controller.revenues
);

// Analytics
router.get(
    "/analytics",
    auth,
    policy({
        auth: true,
        admin: true,
        permission: "analytics.view",
        report: true
    }),
    controller.analytics
);

// Audit Logs
router.get(
    "/audit",
    auth,
    policy({
        auth: true,
        admin: true,
        permission: "audit.view"
    }),
    controller.audit
);

// Health
router.get(
    "/health",
    auth,
    policy({
        auth: true,
        admin: true,
        system: true
    }),
    controller.health
);

// Announcement
router.post(
    "/announcement",
    auth,
    policy({
        auth: true,
        admin: true,
        permission: "announcement.create",
        notification: true,
        audit: "ANNOUNCEMENT_CREATE"
    }),
    controller.announcement
);

module.exports = router;