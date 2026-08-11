const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./social.controller");

// Follow
router.post(
    "/follow",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "FOLLOW",
        security: true,
        session: true,
        audit: "FOLLOW"
    }),
    controller.follow
);

// Unfollow
router.post(
    "/unfollow",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "FOLLOW",
        security: true,
        session: true,
        audit: "FOLLOW"
    }),
    controller.unfollow
);

// Block
router.post(
    "/block",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "BLOCK",
        security: true,
        session: true,
        audit: "BLOCK"
    }),
    controller.block
);

// Unblock
router.post(
    "/unblock",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "BLOCK",
        security: true,
        session: true,
        audit: "BLOCK"
    }),
    controller.unblock
);

// Mute
router.post(
    "/mute",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "MUTE",
        security: true,
        session: true,
        audit: "MUTE"
    }),
    controller.mute
);

// Unmute
router.post(
    "/unmute",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "MUTE",
        security: true,
        session: true,
        audit: "MUTE"
    }),
    controller.unmute
);

// Followers
router.get(
    "/followers",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        session: true
    }),
    controller.followers
);

// Following
router.get(
    "/following",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        session: true
    }),
    controller.following
);

// Suggestions
router.get(
    "/suggestions",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        session: true,
        search: true,
        ai: "USER_RECOMMENDATIONS"
    }),
    controller.suggestions
);

// Send Friend Request
router.post(
    "/friend/request",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "SEND_FRIEND_REQUEST",
        session: true,
        audit: "SEND_FRIEND_REQUEST"
    }),
    controller.sendFriendRequest
);

// Cancel Friend Request
router.post(
    "/friend/cancel",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "CANCEL_FRIEND_REQUEST",
        session: true,
        audit: "CANCEL_FRIEND_REQUEST"
    }),
    controller.cancelFriendRequest
);

// Accept Friend Request
router.post(
    "/friend/accept",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "ACCEPT_FRIEND_REQUEST",
        session: true,
        audit: "ACCEPT_FRIEND_REQUEST"
    }),
    controller.acceptFriendRequest
);

// Reject Friend Request
router.post(
    "/friend/reject",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "REJECT_FRIEND_REQUEST",
        session: true,
        audit: "REJECT_FRIEND_REQUEST"
    }),
    controller.rejectFriendRequest
);

// Unfriend
router.post(
    "/friend/unfriend",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "UNFRIEND",
        session: true,
        audit: "UNFRIEND"
    }),
    controller.unfriend
);

// Friends
router.get(
    "/friends",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        session: true
    }),
    controller.friends
);

// Friend Requests
router.get(
    "/friend-requests",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        session: true
    }),
    controller.friendRequests
);

// Sent Requests
router.get(
    "/sent-requests",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        session: true
    }),
    controller.sentRequests
);

module.exports = router;