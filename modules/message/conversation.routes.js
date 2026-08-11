const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./conversation.controller");

/**
 * CREATE CONVERSATION
 */
router.post(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "CONVERSATION_CREATE",
        notification: true
    }),
    controller.create
);

/**
 * GET MY CONVERSATIONS
 */
router.get(
    "/",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "MEDIA_UPLOAD"
    }),
    controller.getMyConversations
);

/**
 * GET SINGLE CONVERSATION
 */
router.get(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "conversation:view"
    }),
    controller.getById
);

/**
 * UPDATE CONVERSATION
 */
router.patch(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        verified: true,
        permission: "conversation:update"
    }),
    controller.update
);

/**
 * DELETE CONVERSATION
 */
router.delete(
    "/:id",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "conversation:delete",
        audit: "DELETE_CONVERSATION"
    }),
    controller.delete
);

/**
 * ARCHIVE CONVERSATION
 */
router.patch(
    "/:id/archive",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "conversation:update"
    }),
    controller.archive
);

/**
 * UNARCHIVE CONVERSATION
 */
router.patch(
    "/:id/unarchive",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "conversation:update"
    }),
    controller.unarchive
);

/**
 * MUTE CONVERSATION
 */
router.patch(
    "/:id/mute",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "conversation:update"
    }),
    controller.mute
);

/**
 * UNMUTE CONVERSATION
 */
router.patch(
    "/:id/unmute",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "conversation:update"
    }),
    controller.unmute
);

/**
 * PIN CONVERSATION
 */
router.patch(
    "/:id/pin",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "conversation:update"
    }),
    controller.pin
);

/**
 * UNPIN CONVERSATION
 */
router.patch(
    "/:id/unpin",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "conversation:update"
    }),
    controller.unpin
);

/**
 * ADD PARTICIPANT
 */
router.post(
    "/:id/participants",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "conversation:participants"
    }),
    controller.addParticipant
);

/**
 * REMOVE PARTICIPANT
 */
router.delete(
    "/:id/participants/:userId",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "conversation:participants",
        audit: "REMOVE_PARTICIPANT"
    }),
    controller.removeParticipant
);

/**
 * LEAVE CONVERSATION
 */
router.post(
    "/:id/leave",
    auth,
    policy({
        auth: true,
        account: true,
        permission: "conversation:leave"
    }),
    controller.leave
);

module.exports = router;