const Joi = require("joi");

exports.create = Joi.object({
  podcastId: Joi.string().required(),

  seasonNumber: Joi.number(),

  episodeNumber: Joi.number().required(),

  title: Joi.string().required(),

  description: Joi.string().allow(""),

  audio: Joi.string().allow(""),

  video: Joi.string().allow("")
});