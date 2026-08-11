const Joi = require("joi");

exports.create =
Joi.object({

  businessName:
  Joi.string().required(),

  industry:
  Joi.string().required(),

  campaignName:
  Joi.string().required(),

  campaignObjectives:
  Joi.string().required(),

  campaignBudget:
  Joi.number().required(),

  compensationType:
  Joi.string().required()

});