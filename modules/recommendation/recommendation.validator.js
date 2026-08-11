const Joi = require("joi");

exports.generate =
Joi.object({

  limit:
  Joi.number()
  .min(1)
  .max(100)
  .default(20)

});