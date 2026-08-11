const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./revenue.controller");

router.post(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        role: ["creator", "business", "admin", "superadmin"],
        monetization: true,
        subscription: true,
        permission: "revenue:create",
        audit: "REVENUE_CREATE"
    }),
    controller.create
);

router.get(
    "/my",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        monetization: true,
        permission: "revenue:view",
        audit: "REVENUE_VIEW"
    }),
    controller.getMine
);

router.get(
    "/summary",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        monetization: true,
        permission: "revenue:summary",
        report: true,
        audit: "REVENUE_SUMMARY"
    }),
    controller.summary
);

router.patch(
    "/:id/pay",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        role: ["admin", "superadmin"],
        payment: true,
        wallet: true,
        permission: "revenue:pay",
        audit: "REVENUE_MARK_PAID"
    }),
    controller.markPaid
);

module.exports = router;