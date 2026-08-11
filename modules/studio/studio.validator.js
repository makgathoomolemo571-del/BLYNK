const Joi = require("joi");

exports.create = Joi.object({

  title: Joi.string().required(),

  description: Joi.string().allow("", null),

  contentType: Joi.string()
    .valid("post", "reel", "podcast", "episode")
    .required(),

  media: Joi.array().items(Joi.string()),

  scheduledAt: Joi.date().optional()

});