const Joi = require("joi");

const createNotificationValidator =
Joi.object({

  recipient:
    Joi.string().required(),

  actor:
    Joi.string().optional(),

  type:
    Joi.string().required(),

  title:
    Joi.string().required(),

  message:
    Joi.string().required()
});

module.exports = {
  createNotificationValidator
};