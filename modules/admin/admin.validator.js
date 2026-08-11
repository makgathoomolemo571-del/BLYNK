const Joi = require("joi");

exports.changeRole =
Joi.object({

  role:
  Joi.string()
  .valid(
    "member",
    "creator",
    "business",
    "admin",
    "superadmin"
  )
  .required()

});

exports.announcement =
Joi.object({

  title:
  Joi.string()
  .required(),

  message:
  Joi.string()
  .required()

});