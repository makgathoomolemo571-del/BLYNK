const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./podcast.controller");

// Browse podcasts
router.get(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        content: true
    }),
    controller.getAll
);

// Create podcast
router.post(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        creator: true,
        permission: "PODCAST_CREATE",
        content: true,
        media: true,
        storage: true,
        file: true,
        feature: "PODCASTS",
        subscription: [
            "FREE_CREATOR",
    "CREATOR_BASIC",
    "CREATOR_PLUS",
    "CREATOR_PRO",
     "FREE_BUSINESS",
    "BUSINESS_BASIC",
    "BUSINESS_PRO",
    "BUSINESS_ENTERPRISE"
        ],
        audit: "podcast.create"
    }),
    controller.create
);

router.get(
  "/name/:name",
  auth,
  controller.getByName
);

router.patch(
    "/:id/publish",
    auth,
    controller.publish
);

// My podcasts
router.get(
    "/my",
    auth,
    policy({
        auth: true,
        creator: true
    }),
    controller.getMine
);

// Podcast details
router.get(
    "/:id",
    auth,
    policy({
        auth: true,
        content: true
    }),
    controller.getById
);

// Update podcast
router.patch(
    "/:id",
    auth,
    policy({
        auth: true,
        creator: true,
        permission: "podcast:update",
        content: true,
        media: true,
        storage: true,
        file: true,
        audit: "podcast.update"
    }),
    controller.update
);

// Delete podcast
router.delete(
    "/:id",
    auth,
    policy({
        auth: true,
        creator: true,
        permission: "PODCAST_DELETE",
    
        audit: "POCAST_DELETE"
    }),
    controller.delete
);

// Subscribe
router.post(
    "/:id/subscribe",
    auth,
    policy({
        auth: true,
        account: true
    }),
    controller.subscribe
);

// Unsubscribe
router.post(
    "/:id/unsubscribe",
    auth,
    policy({
        auth: true,
        account: true
    }),
    controller.unsubscribe
);

module.exports = router;