const Joi = require("joi");

module.exports = {

  createReward: Joi.object({

    type: Joi.string()
      .valid("VIG_POINTS", "TOKENS", "VOUCHER")
      .required(),

    source: Joi.string()
      .required(),

    amount: Joi.number()
      .min(0)
      .required()

  })

};