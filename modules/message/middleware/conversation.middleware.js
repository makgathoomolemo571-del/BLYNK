// src/modules/messages/middleware/conversation.middleware.js

const Conversation = require("../conversation/conversation.model");

/**
 * Ensure conversation exists
 */
exports.conversationExists = async (req, res, next) => {
  try {
    const conversationId =
      req.params.conversationId ||
      req.params.id ||
      req.body.conversation;

    if (!conversationId) {
      return res.status(400).json({
        success: false,
        message: "Conversation id is required."
      });
    }

    const conversation =
      await Conversation.findOne({
        _id: conversationId,
        isDeleted: false
      });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found."
      });
    }

    req.conversation = conversation;

    next();

  } catch (err) {
    next(err);
  }
};

/**
 * Ensure authenticated user belongs
 * to this conversation
 */
exports.isParticipant = async (
  req,
  res,
  next
) => {

  try {

    const conversation =
      req.conversation;

    const userId =
      req.user._id.toString();

    const allowed =
      conversation.participants
        .some(
          participant =>
            participant.toString() === userId
        );

    if (!allowed) {
      return res.status(403).json({
        success: false,
        message:
          "You are not a participant in this conversation."
      });
    }

    next();

  } catch (err) {

    next(err);

  }

};

/**
 * Conversation Admin
 */
exports.isAdmin = async (
  req,
  res,
  next
) => {

  try {

    const conversation =
      req.conversation;

    const userId =
      req.user._id.toString();

    const admin =
      conversation.admins
        ?.some(
          admin =>
            admin.toString() === userId
        );

    if (!admin) {
      return res.status(403).json({
        success: false,
        message:
          "Conversation admin access required."
      });
    }

    next();

  } catch (err) {

    next(err);

  }

};

/**
 * Conversation Owner
 */
exports.isOwner = async (
  req,
  res,
  next
) => {

  try {

    const conversation =
      req.conversation;

    if (
      conversation.owner.toString() !==
      req.user._id.toString()
    ) {

      return res.status(403).json({
        success: false,
        message:
          "Conversation owner access required."
      });

    }

    next();

  } catch (err) {

    next(err);

  }

};