const Joi = require("joi");

exports.createAd = Joi.object({

  title: Joi.string().required(),

  description: Joi.string().allow("", null),

  media: Joi.string().required(),

  type: Joi.string().valid("image", "video", "carousel"),

  budget: Joi.number().min(1).required(),

  targetAudience: Joi.object({

    ageMin: Joi.number(),

    ageMax: Joi.number(),

    countries: Joi.array().items(Joi.string()),

    interests: Joi.array().items(Joi.string()),

    gender: Joi.string()
    .allow("")
    .optional(),
    }).default({})

});