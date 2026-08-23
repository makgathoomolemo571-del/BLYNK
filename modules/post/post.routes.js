const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./post.controller");

// ======================================
// CREATE POST
// ======================================

router.post(
    "/create",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "CREATE_POST",
        content: true,
        media: true,
        file: false,
        storage: true,
        feature: "CREATE_POST",
        audit: "POST_CREATE"
    }),
    controller.create
);

// ======================================
// SAVED POSTS
// ======================================

router.get(
    "/saved",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "VIEW_FEED"
    }),
    controller.savedPosts
);

// ======================================
// SAVE POST
// ======================================

router.post(
    "/:id/save",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "POST_SAVE"
    }),
    controller.save
);

// ======================================
// HIDE POST
// ======================================

router.post(
    "/:id/hide",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "post.hide"
    }),
    controller.hide
);

// ======================================
// FEED
// ======================================

router.get(
    "/feed",
    auth,
    policy({
        auth: true,
        account: true,
        feature: "FEED"
    }),
    controller.feed
);

// ======================================
// GET SINGLE POST
// ======================================

router.get(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "VIEW_FEED"
    }),
    controller.getOne
);

// ======================================
// UPDATE POST
// ======================================

router.patch(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "EDIT_POST",
        content: true,
        feature: "CREATE_POST",
        audit: "POST_UPDATE"
    }),
    controller.update
);

// ======================================
// DELETE POST
// ======================================

router.delete(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "DELETE_POST",
        audit: "POST_DELETE"
    }),
    controller.delete
);

// ======================================
// LIKE
// ======================================

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

// ======================================
// COMMENTS
// ======================================

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

router.post(
    "/:postId/comment/:commentId/like",
    auth,
    policy({
        auth: true,
        permission: "LIKE"
    }),
    controller.likeComment
);

router.post(
    "/:id/comment/:commentId/unlike",
    auth,
    policy({
        auth: true,
        permission: "LIKE"
    }),
    controller.unlikeComment
);

router.patch(
    "/:id/comment/:commentId",
    auth,
    policy({
        auth: true,
        permission: "COMMENT",
        content: true
    }),
    controller.editComment
);

router.delete(
    "/:id/comment/:commentId",
    auth,
    policy({
        auth: true,
        permission: "COMMENT"
    }),
    controller.deleteComment
);

router.post(
    "/:id/comment/:commentId/reply",
    auth,
    policy({
        auth: true,
        permission: "COMMENT",
        content: true
    }),
    controller.replyComment
);

router.post(
    "/:id/comment/:commentId/reply/:replyId/like",
    auth,
    policy({
        auth: true,
        permission: "LIKE"
    }),
    controller.likeReply
);

router.post(
    "/:id/comment/:commentId/reply/:replyId/unlike",
    auth,
    policy({
        auth: true,
        permission: "LIKE"
    }),
    controller.unlikeReply
);

router.delete(
  "/:id/comment/:commentId/reply/:replyId",
  auth,
  policy({
    auth: true,
    permission: "COMMENT"
  }),
  controller.deleteReply
);

// ======================================
// SHARE
// ======================================

router.post(
    "/:id/share",
    auth,
    policy({
        auth: true,
        permission: "SHARE"
    }),
    controller.share
);

// ======================================
// REPORT
// ======================================

router.post(
    "/:id/report",
    auth,
    policy({
        auth: true,
        permission: "POST_REPORT",
        report: true,
        audit: "POST_REPORT"
    }),
    controller.report
);

module.exports = router;