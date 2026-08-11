const Joi = require("joi");

/**
 * ===========================
 * Create Message
 * ===========================
 */

exports.create = Joi.object({

  conversationId: Joi.string()
    .required(),

  text: Joi.string()
    .trim()
    .allow("")
    .max(5000),

  attachments: Joi.array()
    .items(
      Joi.object({

        type: Joi.string()
          .valid(
            "image",
            "video",
            "audio",
            "voice",
            "file",
            "gif",
            "sticker",
            "location"
          )
          .required(),

        url: Joi.string()
          .allow("")
          .required(),

        thumbnail: Joi.string()
          .allow(""),

        size: Joi.number(),

        duration: Joi.number(),

        width: Joi.number(),

        height: Joi.number()

      })
    )
    .default([]),

  replyTo: Joi.string()
    .allow("", null),

  forwardedFrom: Joi.string()
    .allow("", null),

  mentions: Joi.array()
    .items(Joi.string())
    .default([])

}).custom((value, helpers) => {

  if (
    !value.text &&
    (!value.attachments ||
      value.attachments.length === 0)
  ) {

    return helpers.message(
      "Message must contain text or an attachment."
    );

  }

  return value;

});


/**
 * ===========================
 * Update Message
 * ===========================
 */

exports.update = Joi.object({

  text: Joi.string()
    .trim()
    .max(5000)
    .required()

});


/**
 * ===========================
 * React To Message
 * ===========================
 */

exports.react = Joi.object({

  reaction: Joi.string()
    .valid(
      "👍",
      "❤️",
      "😂",
      "😮",
      "😢",
      "😡",
      "🔥",
      "👏"
    )
    .required()

});


/**
 * ===========================
 * Delete Message
 * ===========================
 */

exports.delete = Joi.object({

  deleteForEveryone: Joi.boolean()
    .default(false)

});


/**
 * ===========================
 * Forward Message
 * ===========================
 */

exports.forward = Joi.object({

  conversationId: Joi.string()
    .required()

});


/**
 * ===========================
 * Mark As Read
 * ===========================
 */

exports.read = Joi.object({});


/**
 * ===========================
 * Typing Indicator
 * ===========================
 */

exports.typing = Joi.object({

  conversationId: Joi.string()
    .required(),

  typing: Joi.boolean()
    .required()

});