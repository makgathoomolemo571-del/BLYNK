const Joi = require("joi");

exports.createReferral = Joi.object({

  code: Joi.string().required()

});

exports.completeReferral = Joi.object({

  referredUser: Joi.string().required()

});