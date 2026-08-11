const Joi =
require("joi");

exports.createReel = {

  body: Joi.object({

    caption:
      Joi.string()
      .allow("")
      .max(2200),

    video:
      Joi.object({
        url: Joi.string().required(),
        thumbnail: Joi.string().allow("")
      }).required(),

    visibility:
      Joi.string()
      .valid(
        "public",
        "followers",
        "subscribers",
        "private"
      )
      .default("public")

  })

};