const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./marketplace.controller");

// =====================================
// CREATE LISTING
// =====================================

router.post(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "MARKETPLACE_CREATE",
        marketplace: true,
        content: true,
        media: true
    }),
    controller.create
);

// =====================================
// GET ALL LISTINGS
// =====================================

router.get(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        marketplace: true
    }),
    controller.getAll
);

// =====================================
// MY LISTINGS
// =====================================

router.get(
    "/my",
    auth,
    policy({
        auth: true,
        account: true,
        marketplace: true
    }),
    controller.getMine
);

// =====================================
// GET ONE
// =====================================

router.get(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        marketplace: true
    }),
    controller.getById
);

// =====================================
// UPDATE
// =====================================

router.patch(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "marketplace.update",
        marketplace: true,
        content: true,
        media: true,
        audit: "MARKETPLACE_UPDATED"
    }),
    controller.update
);

// =====================================
// DELETE
// =====================================

router.delete(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "marketplace.delete",
        marketplace: true,
        audit: "MARKETPLACE_DELETED"
    }),
    controller.remove
);

// =====================================
// APPLY
// =====================================

router.post(
    "/:id/apply",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        marketplace: true,
        permission: "marketplace.apply"
    }),
    controller.apply
);

// =====================================
// VIEW APPLICATIONS
// =====================================

router.get(
    "/:id/applications",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "marketplace.manageApplications",
        marketplace: true
    }),
    controller.getApplications
);

module.exports = router;