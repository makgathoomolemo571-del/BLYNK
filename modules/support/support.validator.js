const Joi = require("joi");

exports.create =
Joi.object({

  subject:
  Joi.string()
  .required(),

  issueType:
  Joi.string()
  .required(),

  description:
  Joi.string()
  .required(),

  affectedFeature:
  Joi.string()
  .allow("",null),

  priority:
  Joi.string()
  .valid(
    "low",
    "medium",
    "high",
    "urgent"
  )
});