const Joi =
require("joi");

exports.createPost =
Joi.object({

  caption:
    Joi.string()
      .allow("")
      .max(2200),

  visibility:
    Joi.string()
      .valid(
        "public",
        "followers",
        "subscribers",
        "private"
      )
      .default("public")

});

exports.comment =
Joi.object({

  text:
    Joi.string()
      .required()
      .max(1000)

});

exports.report =
Joi.object({

  reason:
    Joi.string()
      .required()

});