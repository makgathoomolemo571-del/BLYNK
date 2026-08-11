const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./episode.controller");

// Create Episode
router.post(
    "/",
    auth,
    policy({
        auth: true,
        creator: true,
        verified: true,
        account: true,
        permission: "EPISODE_CREATE",
        subscription: ["FREE_CREATOR",

    "CREATOR_BASIC",
    "CREATOR_PLUS",
    "CREATOR_PRO", "FREE_BUSINESS",
    "BUSINESS_BASIC",
    "BUSINESS_PRO",
    "BUSINESS_ENTERPRISE"],
        feature: "EPISODE_CREATE",
        content: true,
        media: true,
        storage: true,
        file: true,
        audit: "EPISODE_CREATE"
    }),
    controller.create
);

// Get all episodes for a podcast
router.get(
  "/podcast/:podcastId",
  auth,
  policy({
    auth: true,
    account: true,
    permission: "VIEW_EPISODES_HUB"
  }),
  controller.getByPodcast
);

// Get Episode
router.get(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "VIEW_EPISODES_HUB"
    }),
    controller.getById
);

// Update Episode
router.patch(
    "/:id",
    auth,
    policy({
        auth: true,
        creator: true,
        verified: true,
        account: true,
        permission: "episode:update",
        content: true,
        audit: "EPISODE_UPDATE"
    }),
    controller.update
);

// Delete Episode
router.delete(
    "/:id",
    auth,
    policy({
        auth: true,
        creator: true,
        verified: true,
        account: true,
        permission: "EPISODE_DELETE",
        audit: "EPISODE_DELETE"
    }),
    controller.delete
);

// Play Episode
router.post(
    "/:id/play",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "episode:play"
    }),
    controller.play
);

// View Episode
router.post(
    "/:id/view",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "VIEW_EPISODES_HUB"
    }),
    controller.view
);

// Like Episode
router.post(
    "/:id/like",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "episode:like"
    }),
    controller.like
);

// Share Episode
router.post(
    "/:id/share",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "episode:share"
    }),
    controller.share
);

module.exports = router;