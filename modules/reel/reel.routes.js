const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");
const upload = require("../../middleware/upload.middleware");
const controller = require("./reel.controller");

// Create Reel
router.post(
    "/create",
    auth,
    upload.single("file"),
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "CREATE_REEL",
        content: true,
        media: true,
        file: true,
        storage: true,
        feature: "REELS"
    }),
    controller.create
);

// Feed
router.get(
    "/feed",
    auth,
    policy({
        auth: true,
        account: true,
        feature: "REELS"
    }),
    controller.feed
);

// View Reel
router.get(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        feature: "REELS"
    }),
    controller.getById
);

// Update Reel
router.patch(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "EDIT_REEL",
        content: true,
        media: true,
        ownership: true,
        audit: "REEL_UPDATED"
    }),
    controller.update
);

// Delete Reel
router.delete(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "DELETE_REEL",
        ownership: true,
        audit: "REEL_DELETED"
    }),
    controller.remove
);

// Like
router.post(
    "/:id/like",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "LIKE"
    }),
    controller.like
);

// Unlike
router.post(
    "/:id/unlike",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "LIKE"
    }),
    controller.unlike
);

// Comment
router.post(
    "/:id/comment",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "COMMENT",
        content: true
    }),
    controller.comment
);

// Share
router.post(
    "/:id/share",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "SHARE"
    }),
    controller.share
);

// Save
router.post(
    "/:id/save",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "reel.save"
    }),
    controller.save
);

// Unsave
router.post(
    "/:id/unsave",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "SAVE_REEL"
    }),
    controller.unsave
);

// View Count
router.post(
    "/:id/view",
    auth,
    policy({
        auth: true,
        account: true,
        feature: "REELS"
    }),
    controller.view
);

module.exports = router;