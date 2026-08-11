const Joi = require("joi");

exports.search = Joi.object({
  q: Joi.string().required(),

  type: Joi.string().valid(
    "all",
    "users",
    "creators",
    "businesses",
    "posts",
    "reels",
    "podcasts",
    "marketplace",
    "creatorHires",
    "businessFinds"
  )
  .default("all")
});