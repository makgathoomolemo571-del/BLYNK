const Joi = require("joi");

exports.create = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(""),
  category: Joi.string(),
  coverImage: Joi.string().allow(""),
  visibility: Joi.string()
});