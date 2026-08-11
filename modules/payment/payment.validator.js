const Joi = require("joi");

exports.createPayment = Joi.object({

  type: Joi.string().required(),

  amount: Joi.number().positive().required(),

  currency: Joi.string().valid(
    "TOKENS",
    "VIG_POINTS",
    "VOUCHER"
  ).required(),

  metadata: Joi.object().optional()

});