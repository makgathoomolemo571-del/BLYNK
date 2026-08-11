const Joi = require("joi");

exports.upload =
Joi.object({

  module:
  Joi.string()
  .required(),

  type:
  Joi.string()
  .valid(
    "image",
    "video",
    "audio",
    "document"
  )
  .required()

});