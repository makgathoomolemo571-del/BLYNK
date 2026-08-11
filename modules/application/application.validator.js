const Joi = require("joi");

exports.create =
Joi.object({

  targetType:
  Joi.string()
  .valid(
    "creator_hire",
    "business_find",
    "marketplace"
  )
  .required(),

  targetId:
  Joi.string().required(),

  message:
  Joi.string()
  .allow("")
});