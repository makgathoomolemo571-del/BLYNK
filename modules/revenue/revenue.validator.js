const Joi = require("joi");

exports.create =
Joi.object({

  source:
  Joi.string()
  .valid(
    "subscription",
    "tip",
    "marketplace",
    "creatorHire",
    "businessFind",
    "sponsorship",
    "watchParty",
    "podcast"
  )
  .required(),

  amount:
  Joi.number()
  .positive()
  .required(),

  description:
  Joi.string()
  .allow("",null),

  referenceId:
  Joi.string()
  .allow("",null)

});