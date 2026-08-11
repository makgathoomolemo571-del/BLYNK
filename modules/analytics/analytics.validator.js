const Joi = require("joi");

exports.track =
Joi.object({

  eventType:
  Joi.string()
  .required(),

  targetId:
  Joi.string()
  .required(),

  targetType:
  Joi.string()
  .required()

});