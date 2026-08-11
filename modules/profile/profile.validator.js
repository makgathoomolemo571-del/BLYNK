const Joi = require("joi");

const createProfileSchema =
Joi.object({

  firstName:
    Joi.string().max(50),

  lastName:
    Joi.string().max(50),

  displayName:
    Joi.string().max(100),

  bio:
    Joi.string().max(500),

  website:
    Joi.string().allow(""),

  profilePicture:
    Joi.string().allow(""),

  coverBanner:
    Joi.string().allow("")
});

module.exports = {
  createProfileSchema
};