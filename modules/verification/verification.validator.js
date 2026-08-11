const Joi = require("joi");

exports.create =
Joi.object({

  type:
  Joi.string()
  .valid(
    "identity",
    "creator",
    "business",
    "venue",
    "podcast"
  )
  .required(),

  fullName:
  Joi.string()
  .required(),

  idNumber:
  Joi.string()
  .allow("",null),

  registrationNumber:
  Joi.string()
  .allow("",null),

  taxNumber:
  Joi.string()
  .allow("",null),

  website:
  Joi.string()
  .allow("",null)

});