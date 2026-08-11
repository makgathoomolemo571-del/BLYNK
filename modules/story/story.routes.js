const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");
const upload = require("../../middleware/upload.middleware");
const controller = require("./story.controller");
const Post = require("../post/post.model");

/**
 * Create Story
 */
router.post(
    "/create",
    auth,
    upload.single("file"),
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "CREATE_STORY",
        content: true,
        media: true,
        storage: true,
        file: true
    }),
    controller.create
);

/**
 * Story Feed
 */
router.get(
    "/feed",
    auth,
    policy({
        auth: true,
        account: true,
        notification: true
    }),
    controller.feed
);

/**
 * React to Story
 */
router.post(
    "/:id/react",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "LIKE"
    }),
    controller.react
);

/**
 * Comment on Story
 */
router.post(
    "/:id/comment",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "COMMENT"
    }),
    controller.comment
);

/**
 * Reply to Story
 */
router.post(
    "/:id/reply",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "COMMENT"
    }),
    controller.reply
);

/**
 * View Story
 */
router.post(
    "/:id/view",
    auth,
    policy({
        auth: true,
        account: true,
        content: true
    }),
    controller.view
);

/**
 * Delete Story
 */
router.delete(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "story:delete",
        audit: "story.delete"
    }),
    controller.remove
);

/**
 * Expire Stories
 */
router.post(
    "/expire/run",
    auth,
    policy({
        auth: true,
        admin: true,
        system: true,
        audit: "story.expire"
    }),
    controller.expire
);

module.exports = router;