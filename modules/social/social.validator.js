const Joi = require("joi");

exports.followSchema =
Joi.object({
  targetUserId:
    Joi.string().required()
});

exports.friendSchema =
Joi.object({
  targetUserId:
    Joi.string().required()
});

exports.blockSchema =
Joi.object({
  targetUserId:
    Joi.string().required()
});