const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .required(),

  role: Joi.string()
    .valid(
      "member",
      "creator",
      "business"
    )
    .optional(),

  referralCode: Joi.string()
    .trim()
    .uppercase()
    .max(50)
    .allow("")
    .optional()
});

const updateUserSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30),

  email: Joi.string()
    .email(),

  role: Joi.string().valid(
    "member",
    "creator",
    "business",
    "admin",
    "superadmin"
  ),

  verified: Joi.boolean(),

  status: Joi.string().valid(
    "active",
    "suspended",
    "banned"
  )
});

module.exports = {
  registerSchema,
  updateUserSchema
};