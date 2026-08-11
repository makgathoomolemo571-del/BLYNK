const Joi = require("joi");

exports.report =
Joi.object({

  targetType:
  Joi.string().required(),

  targetId:
  Joi.string().required(),

  reason:
  Joi.string().required(),

  description:
  Joi.string()
  .allow("", null),

  severity:
  Joi.string()
  .valid(
    "low",
    "medium",
    "high",
    "critical"
  )
  .default("medium")

});

exports.review =
Joi.object({

  actionTaken:
  Joi.string()
  .valid(
    "warning",
    "remove_content",
    "suspend_user",
    "ban_user"
  )
  .required(),

  resolutionNotes:
  Joi.string()
  .allow("", null)

});