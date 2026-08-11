const Joi = require("joi");

exports.deposit = Joi.object({
  amount: Joi.number()
    .positive()
    .required()
});

exports.withdraw = Joi.object({
  amount: Joi.number()
    .positive()
    .required()
});