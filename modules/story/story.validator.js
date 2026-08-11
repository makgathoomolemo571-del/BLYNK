const Joi = require("joi");

exports.createStory = {
  body: Joi.object({
    caption: Joi.string().allow(""),

    type: Joi.string()
      .valid("text", "image", "video", "link", "reel-share")
      .required(),

    media: Joi.object({
      url: Joi.string().required(),
      thumbnail: Joi.string().allow("")
    }).required(),

    visibility: Joi.string()
      .valid("public", "followers", "subscribers")
      .default("public")
  })
};