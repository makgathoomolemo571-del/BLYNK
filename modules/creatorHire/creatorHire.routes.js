const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./creatorHire.controller");

// Create Creator Hire Job
router.post(
    "/",
    auth,
    policy({
        auth: true,
        verified: true,
        creator: true,
        subscription: ["FREE_CREATOR",
    "CREATOR_BASIC",
    "CREATOR_PLUS",
    "CREATOR_PRO",],
        feature: "CREATOR_HIRE_CREATE",
        permission: "CREATOR_HIRE_CREATE",
        content: true,
        audit: "CREATOR_HIRE_CREATE"
    }),
    controller.create
);

router.get(
  "/:id/applications",
  auth,
  policy({
    auth:true,
    creator:true,
    permission:"VIEW_CREATOR_HUB",
    feature:"VIEW_CREATOR_HUB"
  }),
  controller.getApplications
);

// My Jobs
router.get(
    "/my",
    auth,
    policy({
        auth: true,
        creator: true,
        permission: "VIEW_CREATOR_HUB"
    }),
    controller.getMyJobs
);



// Browse Jobs
router.get(
    "/",
    auth,
    policy({
        auth: true,
        creator: true,
        feature: "VIEW_CREATOR_HUB",
        permission: "VIEW_CREATOR_HUB",
        search: true
    }),
    controller.getAll
);

router.get(
  "/:id",
  auth,
  policy({
    auth: true,
    creator: true,
    feature: "VIEW_CREATOR_HUB",
    permission: "VIEW_CREATOR_HUB"
  }),
  controller.get
);

// Apply
router.post(
    "/:id/apply",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        creator: true,
        subscription: ["FREE", "CREATOR_PRO", "CREATOR_PREMIUM"],
        permission: "creatorHire.apply",
        feature: "creatorHire.apply",
        notification: true,
        audit: "CREATOR_HIRE_APPLY"
    }),
    controller.apply
);

// Update Status
router.patch(
    "/:id/status",
    auth,
    policy({
        auth: true,
        creator: true,
        permission: "creatorHire.update",
        audit: "CREATOR_HIRE_STATUS"
    }),
    controller.updateStatus
);

// Delete
router.delete(
    "/:id",
    auth,
    policy({
        auth: true,
        creator: true,
        permission: "creatorHire.delete",
        audit: "CREATOR_HIRE_DELETE"
    }),
    controller.delete
);

module.exports = router;