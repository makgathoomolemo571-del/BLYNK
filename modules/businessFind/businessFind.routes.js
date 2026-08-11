const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./businessFind.controller");

// Create Campaign (Business only)

router.post(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        business: true,
        role: ["business"],
        permission: "BUSINESSFIND_CREATE",
        subscription: true,
        feature: "BUSINESSFIND_CREATE",
        audit: "BUSINESS_CAMPAIGN_CREATE"
    }),
    controller.create
);

// Dashboard Stats

router.get(
    "/stats",
    auth,
    policy({
        auth: true,
        account: true,
        business: true,
        role: ["business"],
        permission: "VIEW_BUSINESS_HUB",
        audit: "BUSINESS_CAMPAIGN_STATS"
    }),
    controller.getStats
);

// Browse Campaigns

router.get(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "VIEW_BUSINESS_HUB",
        marketplace: true,
        search: true
    }),
    controller.getAll
);

// My Campaigns

router.get(
    "/my",
    auth,
    policy({
        auth: true,
        account: true,
        business: true,
        role: ["business"],
        permission: "VIEW_BUSINESS_HUB"
    }),
    controller.getMyCampaigns
);

// Campaign Details

router.get(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "VIEW_BUSINESS_HUB"
    }),
    controller.getById
);

// Creator Apply

router.post(
    "/:id/apply",
    auth,
    policy({
        auth: true,
        account: true,
        creator: true,
        role: ["creator"],
        permission: "businessfind:apply",
        subscription: true,
        feature: "creatorHire"
    }),
    controller.apply
);

// Update Campaign Status

router.patch(
    "/:id/status",
    auth,
    policy({
        auth: true,
        account: true,
        business: true,
        role: ["business"],
        permission: "APPLICATION_UPDATE",
        audit: "BUSINESS_CAMPAIGN_UPDATE"
    }),
    controller.updateStatus
);

// Delete Campaign

router.delete(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        business: true,
        role: ["business"],
        permission: "businessfind:delete",
        audit: "BUSINESS_CAMPAIGN_DELETE"
    }),
    controller.delete
);

router.get(
  "/:id/applications",
  auth,
  controller.getApplications
);

module.exports = router;