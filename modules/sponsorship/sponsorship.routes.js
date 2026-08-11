const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./sponsorship.controller");

/*
|--------------------------------------------------------------------------
| Sponsorship Marketplace
|--------------------------------------------------------------------------
*/

// Business creates sponsorship campaign
router.post(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
       verified: true,
        role: ["business"],
        business: true,
        subscription: true,
        feature: "SPONSORSHIP_CREATE",
        payment: true,
        wallet: true,
        permission: "SPONSORSHIP_CREATE",
        audit: "SPONSORSHIP_CREATE"
    }),
    controller.create
);

router.get(
    "/my",
    auth,
    controller.getMine
);

// Browse marketplace
router.get(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        marketplace: true,
        search: true
    }),
    controller.getAll
);

// Featured sponsorships
router.get(
    "/featured",
    auth,
    policy({
        auth: true,
        marketplace: true
    }),
    controller.featured
);

// Sponsorship details
router.get(
    "/:id",
    auth,
    policy({
        auth: true,
        marketplace: true
    }),
    controller.getById
);

// Business updates own campaign
router.patch(
    "/:id",
    auth,
    policy({
        auth: true,
        role: "business",
        business: true,
        permission: "SPONSORSHIP_EDIT",
        audit: "SPONSORSHIP_EDIT"
    }),
    controller.update
);

// Delete campaign
router.delete(
    "/:id",
    auth,
    policy({
        auth: true,
        role: "business",
        business: true,
        permission: "SPONSORSHIP_DELETE",
        audit: "SPONSORSHIP_DELETE"
    }),
    controller.delete
);

/*
|--------------------------------------------------------------------------
| Applications
|--------------------------------------------------------------------------
*/

// Creator applies
router.post(
    "/:id/apply",
    auth,
    policy({
        auth: true,
        role: "creator",
        creator: true,
        subscription: true,
        permission: "SPONSORSHIP_APPLY",
        audit: "SPONSORSHIP_APPLY"
    }),
    controller.apply
);

// Cancel application
router.delete(
    "/:id/apply",
    auth,
    policy({
        auth: true,
        role: "creator",
        creator: true,
        permission: "SPONSORSHIP_CANCEL_APPLICATION"
    }),
    controller.cancelApplication
);

// Business views applicants
router.get(
    "/:id/applications",
    auth,
    policy({
        auth: true,
        role: "business",
        business: true,
        permission: "SPONSORSHIP_VIEW_APPLICATIONS"
    }),
    controller.getApplications
);

// Accept creator
router.patch(
    "/:id/applications/:applicationId/accept",
    auth,
    policy({
        auth: true,
        role: "business",
        business: true,
        permission: "SPONSORSHIP_ACCEPT",
        audit: "SPONSORSHIP_ACCEPT"
    }),
    controller.acceptApplication
);

// Reject creator
router.patch(
    "/:id/applications/:applicationId/reject",
    auth,
    policy({
        auth: true,
        role: "business",
        business: true,
        permission: "SPONSORSHIP_REJECT",
        audit: "SPONSORSHIP_REJECT"
    }),
    controller.rejectApplication
);

/*
|--------------------------------------------------------------------------
| Campaign Lifecycle
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/start",
    auth,
    policy({
        auth: true,
        role: "business",
        business: true,
        permission: "SPONSORSHIP_START",
        audit: "SPONSORSHIP_START"
    }),
    controller.start
);

router.patch(
    "/:id/complete",
    auth,
    policy({
        auth: true,
        role: "business",
        business: true,
        permission: "SPONSORSHIP_COMPLETE",
        audit: "SPONSORSHIP_COMPLETE"
    }),
    controller.complete
);

router.patch(
    "/:id/cancel",
    auth,
    policy({
        auth: true,
        permission: "SPONSORSHIP_CANCEL",
        audit: "SPONSORSHIP_CANCEL"
    }),
    controller.cancel
);

/*
|--------------------------------------------------------------------------
| Deliverables
|--------------------------------------------------------------------------
*/

// Creator submits work
router.post(
    "/:id/submit",
    auth,
    policy({
        auth: true,
        role: "creator",
        creator: true,
        media: true,
        file: true,
        storage: true,
        permission: "SPONSORSHIP_SUBMIT"
    }),
    controller.submitDeliverable
);

// Business approves work
router.patch(
    "/:id/approve",
    auth,
    policy({
        auth: true,
        role: "business",
        business: true,
        permission: "SPONSORSHIP_APPROVE"
    }),
    controller.approveDeliverable
);

// Business rejects work
router.patch(
    "/:id/reject",
    auth,
    policy({
        auth: true,
        role: "business",
        business: true,
        permission: "SPONSORSHIP_REJECT_DELIVERABLE"
    }),
    controller.rejectDeliverable
);

/*
|--------------------------------------------------------------------------
| Payments
|--------------------------------------------------------------------------
*/

router.post(
    "/:id/pay",
    auth,
    policy({
        auth: true,
        role: "business",
        payment: true,
        wallet: true,
        permission: "SPONSORSHIP_PAY",
        audit: "SPONSORSHIP_PAYMENT"
    }),
    controller.releasePayment
);

router.post(
    "/:id/refund",
    auth,
    policy({
        auth: true,
        payment: true,
        wallet: true,
        permission: "SPONSORSHIP_REFUND",
        audit: "SPONSORSHIP_REFUND"
    }),
    controller.refund
);

/*
|--------------------------------------------------------------------------
| Analytics
|--------------------------------------------------------------------------
*/

router.get(
    "/analytics/me",
    auth,
    policy({
        auth: true,
        subscription: true,
        feature: "ANALYTICS"
    }),
    controller.myAnalytics
);

router.get(
    "/analytics/:id",
    auth,
    policy({
        auth: true,
        role: "business",
        subscription: true,
        feature: "ANALYTICS"
    }),
    controller.analytics
);

module.exports = router;