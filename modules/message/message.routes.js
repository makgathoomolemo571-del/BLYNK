const router = require("express").Router();

const auth = require("../../middleware/auth.middleware");
const policy = require("../../middleware/policy.middleware");

const controller = require("./message.controller");

/*
|--------------------------------------------------------------------------
| Message CRUD
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  auth,
  policy({
    auth: true,
    account: true,
    verified: true,
    permission: "message.create",
    notification: true
  }),
  controller.create
);

router.get(
  "/conversation/:conversationId",
  auth,
  policy({
    auth: true,
    account: true,
    permission: "message.read"
  }),
  controller.getConversationMessages
);

router.get(
  "/:id",
  auth,
  policy({
    auth: true,
    account: true,
    permission: "message.read"
  }),
  controller.getById
);

router.patch(
  "/:id",
  auth,
  policy({
    auth: true,
    account: true,
    permission: "message.update"
  }),
  controller.update
);

router.delete(
  "/:id",
  auth,
  policy({
    auth: true,
    account: true,
    permission: "message.delete",
    audit: "MESSAGE_DELETE"
  }),
  controller.delete
);

/*
|--------------------------------------------------------------------------
| Message Actions
|--------------------------------------------------------------------------
*/

router.post(
  "/:id/reply",
  auth,
  policy({
    auth: true,
    account: true,
    permission: "message.reply"
  }),
  controller.reply
);

router.post(
  "/:id/forward",
  auth,
  policy({
    auth: true,
    account: true,
    permission: "message.forward"
  }),
  controller.forward
);

router.post(
  "/:id/react",
  auth,
  policy({
    auth: true,
    account: true,
    permission: "message.react"
  }),
  controller.react
);

router.delete(
  "/:id/react",
  auth,
  policy({
    auth: true,
    account: true,
    permission: "message.react"
  }),
  controller.removeReaction
);

router.post(
  "/:id/read",
  auth,
  policy({
    auth: true,
    account: true,
    permission: "message.read"
  }),
  controller.markRead
);

router.post(
  "/:id/pin",
  auth,
  policy({
    auth: true,
    account: true,
    permission: "message.pin"
  }),
  controller.pin
);

router.delete(
  "/:id/pin",
  auth,
  policy({
    auth: true,
    account: true,
    permission: "message.pin"
  }),
  controller.unpin
);

router.post(
  "/:id/star",
  auth,
  policy({
    auth: true,
    account: true,
    permission: "message.star"
  }),
  controller.star
);

router.delete(
  "/:id/star",
  auth,
  policy({
    auth: true,
    account: true,
    permission: "message.star"
  }),
  controller.unstar
);

router.post(
  "/:id/share",
  auth,
  policy({
    auth: true,
    account: true,
    permission: "message.share"
  }),
  controller.share
);

router.post(
  "/upload",
  auth,
  policy({
    auth: true,
    account: true,
    permission: "message.upload",
    file: true,
    storage: true,
    media: true
  }),
  controller.uploadAttachment
);

router.get(
  "/search/:conversationId",
  auth,
  policy({
    auth: true,
    account: true,
    permission: "message.search",
    search: true
  }),
  controller.search
);

module.exports = router;