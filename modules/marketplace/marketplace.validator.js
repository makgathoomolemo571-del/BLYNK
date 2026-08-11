const Joi = require("joi");

exports.create =
Joi.object({

  listingType:
  Joi.string().required(),

  title:
  Joi.string().required(),

  category:
  Joi.string().allow(""),

  description:
  Joi.string().allow(""),

  price:
  Joi.number(),

  budgetRange:
  Joi.string().allow(""),

  location:
  Joi.string().allow("")
});