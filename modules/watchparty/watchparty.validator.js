const Joi = require("joi");

exports.create =
Joi.object({

  title:
  Joi.string().required(),

  description:
  Joi.string().allow(""),

  type:
  Joi.string(),

  thumbnail:
  Joi.string().allow(""),

  visibility:
  Joi.string()
});