const Joi = require("joi");

const registerValidator = Joi.object({

    firstName: Joi.string().trim().min(2).max(50).required(),

    lastName: Joi.string().trim().min(2).max(50).required(),

    displayName: Joi.string().trim().min(2).max(50).required(),

    username: Joi.string()
        .trim()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email()
        .lowercase()
        .required(),

    phone: Joi.string()
        .required(),

    country: Joi.string().required(),

    province: Joi.string().required(),

    city: Joi.string().required(),

    dateOfBirth: Joi.date().required(),

    gender: Joi.string()
        .valid(
            "male",
            "female",
            "other",
            "prefer_not_to_say"
        )
        .required(),

    password: Joi.string()
        .min(8)
        .max(100)
        .required(),

    confirmPassword: Joi.any()
        .valid(Joi.ref("password"))
        .required(),

    role: Joi.string()
        .valid(
            "member",
            "creator",
            "business"
        )
        .default("member"),

        plan: Joi.string()
    .valid(
        "FREE_MEMBER",
        "MEMBER_BASIC",
        "MEMBER_PLUS",

        "FREE_CREATOR",
        "CREATOR_BASIC",
        "CREATOR_PLUS",
        "CREATOR_PRO",

        "FREE_BUSINESS",
        "BUSINESS_BASIC",
        "BUSINESS_PRO",
        "BUSINESS_ENTERPRISE"
    )
    .required(),

    acceptTerms: Joi.boolean()
        .valid(true)
        .required(),

    acceptPrivacy: Joi.boolean()
        .valid(true)
        .required(),

    marketingConsent: Joi.boolean()
        .default(false)

});

const loginValidator = Joi.object({

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .required(),

  rememberMe: Joi.boolean()
    .default(false)

});

module.exports = {
    registerValidator,
    loginValidator
};