const Joi = require("joi");

const createSubscriptionValidator =
Joi.object({

  plan: Joi.string()
    .valid(
      // FREE TIERS
      "FREE_MEMBER",
      "FREE_CREATOR",
      "FREE_BUSINESS",

      // MEMBER
      "MEMBER_PLUS",

      // CREATOR
      "CREATOR_PLUS",

      // BUSINESS
      "BUSINESS_PLUS"
    )
    .required()
});

module.exports = {
  createSubscriptionValidator
};