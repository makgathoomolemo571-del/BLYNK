const Joi = require("joi");

/**
 * ===============================
 * Create Conversation
 * ===============================
 */
exports.createConversation = Joi.object({

  type: Joi.string()
    .valid(
      "private",
      "group",
      "business",
      "creator",
      "marketplace",
      "watchparty"
    )
    .required(),

  participants: Joi.array()
    .items(
      Joi.string()
        .hex()
        .length(24)
    )
    .min(1)
    .required(),

  name: Joi.string()
    .max(100)
    .allow("", null),

  description: Joi.string()
    .max(1000)
    .allow("", null),

  photo: Joi.string()
    .uri()
    .allow("", null)

});


/**
 * ===============================
 * Update Conversation
 * ===============================
 */
exports.updateConversation = Joi.object({

  name: Joi.string()
    .max(100),

  description: Joi.string()
    .max(1000)
    .allow("", null),

  photo: Joi.string()
    .uri()
    .allow("", null),

  isArchived: Joi.boolean(),

  isMuted: Joi.boolean(),

  isLocked: Joi.boolean()

}).min(1);


/**
 * ===============================
 * Add Participants
 * ===============================
 */
exports.addParticipants = Joi.object({

  participants: Joi.array()

    .items(
      Joi.string()
        .hex()
        .length(24)
    )

    .min(1)

    .required()

});


/**
 * ===============================
 * Remove Participant
 * ===============================
 */
exports.removeParticipant = Joi.object({

  participantId: Joi.string()

    .hex()

    .length(24)

    .required()

});


/**
 * ===============================
 * Leave Conversation
 * ===============================
 */
exports.leaveConversation = Joi.object({});


/**
 * ===============================
 * Archive Conversation
 * ===============================
 */
exports.archiveConversation = Joi.object({

  archived: Joi.boolean()

    .required()

});


/**
 * ===============================
 * Mute Conversation
 * ===============================
 */
exports.muteConversation = Joi.object({

  muted: Joi.boolean()

    .required()

});


/**
 * ===============================
 * Delete Conversation
 * ===============================
 */
exports.deleteConversation = Joi.object({

  deleteForEveryone: Joi.boolean()

    .default(false)

});